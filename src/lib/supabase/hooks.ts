import { useEffect, useState } from "react";
import { createClient } from "./client";
import { User } from "@supabase/supabase-js";
import { Database } from "./database.types";

// Hook to get the current user
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setIsLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { user, isLoading };
}

// Hook to get data with real-time updates
export function useRealtimeData<T>(
  table: keyof Database["public"]["Tables"],
  column: string,
  value: string | number,
  initialData: T[] = [],
) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error } = await supabase
        .from(table)
        .select("*")
        .eq(column, value);

      if (!error && fetchedData) {
        setData(fetchedData as unknown as T[]);
      }
      setIsLoading(false);
    };

    fetchData();

    // Set up realtime subscription
    const channel = supabase
      .channel(`${table}_${column}_${value}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table as string,
          filter: `${column}=eq.${value}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setData((prevData) => [...prevData, payload.new as unknown as T]);
          } else if (payload.eventType === "UPDATE") {
            setData((prevData) =>
              prevData.map((item: any) =>
                item.id === payload.new.id ? payload.new : item,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setData((prevData) =>
              prevData.filter((item: any) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, table, column, value]);

  return { data, isLoading };
}

// Hook to get a single item
export function useItem<T>(
  table: keyof Database["public"]["Tables"],
  id: string | number,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase
          .from(table)
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setData(fetchedData as unknown as T);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [supabase, table, id]);

  return { data, isLoading, error };
}

"use client";

import { createClient } from "../../../supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function useSupabaseUser() {
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

export function useSupabaseRealtime<T>(
  table: string,
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
        setData(fetchedData as T[]);
      }
      setIsLoading(false);
    };

    fetchData();

    // Set up realtime subscription
    const subscription = supabase
      .channel(`${table}_${column}_${value}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: `${column}=eq.${value}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setData((prevData) => [...prevData, payload.new as T]);
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
      supabase.removeChannel(subscription);
    };
  }, [supabase, table, column, value]);

  return { data, isLoading };
}

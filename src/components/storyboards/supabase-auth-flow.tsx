export default function SupabaseAuthFlowStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Supabase Authentication Flow</h2>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Client Side</h3>
          <div className="bg-gray-100 p-3 rounded-md mb-3 text-sm font-mono">
            <p className="text-blue-600">// Create client</p>
            <p>const supabase = createClient();</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Sign up</p>
            <p>const { data, error } = </p>
            <p>  await supabase.auth.signUp({</p>
            <p>    email,</p>
            <p>    password,</p>
            <p>    options: {</p>
            <p>      data: { name }</p>
            <p>    }</p>
            <p>  });</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Sign in</p>
            <p>const { data, error } = </p>
            <p>  await supabase.auth.signInWithPassword({</p>
            <p>    email,</p>
            <p>    password</p>
            <p>  });</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Sign out</p>
            <p>await supabase.auth.signOut();</p>
          </div>
        </div>
        
        <div className="col-span-1 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Server Side</h3>
          <div className="bg-gray-100 p-3 rounded-md mb-3 text-sm font-mono">
            <p className="text-blue-600">// Create server client</p>
            <p>const supabase = await createClient();</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Get session</p>
            <p>const {</p>
            <p>  data: { session },</p>
            <p>} = await supabase.auth.getSession();</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Get user</p>
            <p>const {</p>
            <p>  data: { user },</p>
            <p>} = await supabase.auth.getUser();</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Server action sign out</p>
            <p>await supabase.auth.signOut();</p>
            <p>redirect("/sign-in");</p>
          </div>
        </div>
        
        <div className="col-span-1 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Middleware</h3>
          <div className="bg-gray-100 p-3 rounded-md mb-3 text-sm font-mono">
            <p className="text-blue-600">// Create middleware client</p>
            <p>const res = NextResponse.next();</p>
            <p>const supabase = createMiddlewareClient({</p>
            <p>  req,</p>
            <p>  res</p>
            <p>});</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Refresh session</p>
            <p>await supabase.auth.getSession();</p>
            <p>&nbsp;</p>
            <p className="text-blue-600">// Protected routes</p>
            <p>if (isProtectedRoute && !session) {</p>
            <p>  return NextResponse.redirect(</p>
            <p>    new URL("/sign-in", req.url)</p>
            <p>  );</p>
            <p>}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Authentication Context</h3>
        <div className="bg-gray-100 p-3 rounded-md text-sm font-mono">
          <p className="text-blue-600">// Auth context provider</p>
          <p>export const AuthContext = createContext({</p>
          <p>  user: null,</p>
          <p>  isLoading: true,</p>
          <p>  signOut: async () => {}</p>
          <p>});</p>
          <p>&nbsp;</p>
          <p className="text-blue-600">// Use auth hook</p>
          <p>export const useAuth = () => useContext(AuthContext);</p>
          <p>&nbsp;</p>
          <p className="text-blue-600">// Listen for auth changes</p>
          <p>supabase.auth.onAuthStateChange((event, session) => {</p>
          <p>  setUser(session?.user || null);</p>
          <p>  setIsLoading(false);</p>
          <p>});</p>
        </div>
      </div>
    </div>
  );
}

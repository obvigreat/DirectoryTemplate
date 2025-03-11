export default function AuthComponentsStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Components</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Components</h3>
          <ul className="space-y-2">
            <li className="flex items-center p-2 bg-blue-50 rounded-md">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">AuthStateProvider</span>
              <span className="ml-auto text-xs text-gray-500">Context Provider</span>
            </li>
            <li className="flex items-center p-2 bg-blue-50 rounded-md">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">AuthForm</span>
              <span className="ml-auto text-xs text-gray-500">UI Component</span>
            </li>
            <li className="flex items-center p-2 bg-blue-50 rounded-md">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">ProtectedRoute</span>
              <span className="ml-auto text-xs text-gray-500">HOC</span>
            </li>
            <li className="flex items-center p-2 bg-blue-50 rounded-md">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">SupabaseListener</span>
              <span className="ml-auto text-xs text-gray-500">Sync Component</span>
            </li>
            <li className="flex items-center p-2 bg-blue-50 rounded-md">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">useAuth</span>
              <span className="ml-auto text-xs text-gray-500">Custom Hook</span>
            </li>
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Server Files</h3>
          <ul className="space-y-2">
            <li className="flex items-center p-2 bg-green-50 rounded-md">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">middleware.ts</span>
              <span className="ml-auto text-xs text-gray-500">Route Protection</span>
            </li>
            <li className="flex items-center p-2 bg-green-50 rounded-md">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">supabase/server.ts</span>
              <span className="ml-auto text-xs text-gray-500">Server Client</span>
            </li>
            <li className="flex items-center p-2 bg-green-50 rounded-md">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">supabase/client.ts</span>
              <span className="ml-auto text-xs text-gray-500">Browser Client</span>
            </li>
            <li className="flex items-center p-2 bg-green-50 rounded-md">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">actions/auth.ts</span>
              <span className="ml-auto text-xs text-gray-500">Server Actions</span>
            </li>
            <li className="flex items-center p-2 bg-green-50 rounded-md">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">auth/callback/route.ts</span>
              <span className="ml-auto text-xs text-gray-500">Auth Callback</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Auth State Provider</h3>
          <div className="bg-gray-100 p-3 rounded-md text-sm font-mono">
            <p>const AuthContext = createContext({</p>
            <p>  user: null,</p>
            <p>  isLoading: true,</p>
            <p>  signOut: async () => {}</p>
            <p>});</p>
            <p>&nbsp;</p>
            <p>export const useAuth = () => useContext(AuthContext);</p>
            <p>&nbsp;</p>
            <p>export default function AuthStateProvider({children}) {</p>
            <p>  const [user, setUser] = useState(null);</p>
            <p>  const [isLoading, setIsLoading] = useState(true);</p>
            <p>&nbsp;</p>
            <p>  useEffect(() => {</p>
            <p>    // Listen for auth state changes</p>
            <p>    const { data } = supabase.auth.onAuthStateChange(</p>
            <p>      (event, session) => {</p>
            <p>        setUser(session?.user || null);</p>
            <p>        setIsLoading(false);</p>
            <p>      }</p>
            <p>    );</p>
            <p>    return () => data.subscription.unsubscribe();</p>
            <p>  }, []);</p>
            <p>&nbsp;</p>
            <p>  return (</p>
            <p>    &lt;AuthContext.Provider value={{user, isLoading, signOut}}&gt;</p>
            <p>      {children}</p>
            <p>    &lt;/AuthContext.Provider&gt;</p>
            <p>  );</p>
            <p>}</p>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Protected Route Component</h3>
          <div className="bg-gray-100 p-3 rounded-md text-sm font-mono">
            <p>export default function ProtectedRoute({children}) {</p>
            <p>  const { user, isLoading } = useAuth();</p>
            <p>  const router = useRouter();</p>
            <p>  const pathname = usePathname();</p>
            <p>&nbsp;</p>
            <p>  useEffect(() => {</p>
            <p>    if (!isLoading && !user) {</p>
            <p>      router.push(`/sign-in?callbackUrl=${pathname}`);</p>
            <p>    }</p>
            <p>  }, [user, isLoading, router, pathname]);</p>
            <p>&nbsp;</p>
            <p>  if (isLoading) {</p>
            <p>    return &lt;LoadingSpinner /&gt;;</p>
            <p>  }</p>
            <p>&nbsp;</p>
            <p>  if (!user) {</p>
            <p>    return null;</p>
            <p>  }</p>
            <p>&nbsp;</p>
            <p>  return &lt;&gt;{children}&lt;/&gt;;</p>
            <p>}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

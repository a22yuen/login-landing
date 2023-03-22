import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username != "" && password != "") {
      console.log("username: " + username + " password: " + password);
      router.push("/dashboard");
    }
  };

  const textFont =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";

  const label = "block mb-2 text-sm font-medium text-gray-900";

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-md ">
          <div className="p-6 space-y-6">
            <h1 className="text-center text-2xl font-bold  text-gray-900">
              Welcome!
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="username" className={label}>
                  Username
                </label>
                <input
                  name="username"
                  className={textFont}
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className={label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className={textFont}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg py-2 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

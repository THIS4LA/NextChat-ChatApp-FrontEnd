import Link from "next/link";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto p-6 border rounded">
        <h1 className="text-3xl mb-1 flex justify-center">
          Welcome to Next Chat App
        </h1>
        <p className="mb-8 text-center text-gray-400">
          Please login or register to continue
        </p>
        <Link
          href="/login"
          className="bg-green-300 p-2 hover:bg-green-400 text-black w-full flex justify-center mb-4"
        >
          Login
        </Link>
        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <span className="text-green-400 ml-1 cursor-pointer hover:text-green-600">
            <Link href="/register">Register here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;

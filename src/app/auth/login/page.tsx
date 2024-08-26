"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async data => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res?.error) {
      alert(res.error);
      setError(res.error);
    } else {
      console.log("Enviando al Dashboard");
      router.push("/dashboard");
      router.refresh();
    }

    console.log(res);
  })


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit}
        className="flex flex-col space-y-2 p-4 w-[40%] bg-gray-700 rounded-md">
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="text-3xl text-white">Login</h1>
        <label className="text-gray-700" htmlFor="email">email</label>
        <input type="email" placeholder="Ingresar email" id="email"
          {...register("email", {
            required: true
          })}
        />
        {errors.email! && <p className="text-red-500">Email is required</p>}

        <label className="text-gray-700" htmlFor="password">password</label>
        <input type="password" placeholder="Ingresar password" id="password"
          {...register("password", {
            required: true
          })}
        />
        {errors.password! && <p className="text-red-500">Password is required</p>}


        <button className="bg-blue-500 text-white">login</button>
      </form>
    </div>
  )
}

export default LoginPage;

"use client"

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    if (data.password !== data.repeatPassword) return alert("password not match");

    try {

      const rest = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      )

      if (rest.ok) {
        router.push("/auth/login");
      }

      const resJson = await rest.json();
      console.log(resJson);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-indigo-200 w-[40%]  p-4 rounded-md">
        <label className="text-gray-700" htmlFor="name">name</label>
        <input type="text" placeholder="Ingresar nombre" id="name"
          {...register("name", {
            required: true
          })}
        />
        {errors.name! && <p className="text-red-500">Name is required</p>}

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

        <label className="text-gray-700" htmlFor="repeatPassword">repeatPassword</label>
        <input type="password" placeholder="Repetir Password" id="repeatPassword"
          {...register("repeatPassword", {
            required: true
          })}
        />
        {errors.repeatPassword! && <p className="text-red-500">RepeatPassword is required</p>}

        <button className="bg-indigo-500 text-white mt-2">register</button>
      </form>
    </div>
  )
}

export default RegisterPage;

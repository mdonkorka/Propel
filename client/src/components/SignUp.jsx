

const onSubmitForm = () => {

}

function SignUp() {
  return (
    <div class=" h-[calc(100vh-2.5rem)] flex bg-yellow flex flex-col justify-center items-center w-full">
        <h1 class="font-bold text-5xl">Sign Up</h1>
        <form class="flex flex-col justify-center items-center mt-10" onSubmit={onSubmitForm}>
            <input class="border-2 mt-2 w-80 p-1" placeholder="Email" type="email"></input><br/>
            <input class="border-2 mt-2 w-80 p-1" placeholder="Firstname" type="email"></input><br/>
            <input class="border-2 mt-2 w-80 p-1" placeholder="Lastname" type="email"></input><br/>
            <input class="border-2 mt-2 w-80 p-1" placeholder="Password" type="password"></input>
            <button class="bg-amber-400 p-1 h-10 mt-5 w-20">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp
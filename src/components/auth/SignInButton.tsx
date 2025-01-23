import { auth, signIn } from "@/auth";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default async function SignInButton() {
    const session = await auth();
    return (
        <form
            action={async () => {
                "use server";
                if (session) {
                    redirect("/dashboard");
                    return;
                }
                await signIn("", { redirectTo: "/dashboard" });
            }}
        >
            <Button type="submit">Sign In</Button>
        </form>
    );
}

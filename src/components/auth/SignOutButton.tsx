import { signOut } from "@/auth";
import { Button } from "../ui/button";

export function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
            className="w-full"
        >
            <Button type="submit" variant="destructive" className="w-full">
                Sign Out
            </Button>
        </form>
    );
}

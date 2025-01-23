import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export default function HomePomoCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Today&apos;s pomo</CardTitle>
                <CardDescription>Jo shit today</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Focus time
                        </h4>
                        <p className="leading-7 [&:not(:first-child)]:mt-2">
                            2h 30m
                        </p>
                    </div>
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Total time
                        </h4>
                        <p className="leading-7 [&:not(:first-child)]:mt-2">
                            3h
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Continue</Button>
            </CardFooter>
        </Card>
    );
}

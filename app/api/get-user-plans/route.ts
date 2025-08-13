import { auth } from "@/auth";
import sql from "@/lib/db";
import { Plan } from "@/data/definitions";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await auth();
        const userEmail = session?.user?.email;

        if (!userEmail) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const plans = await sql<Plan[]>`
            SELECT plans.* 
            FROM plans
            JOIN users ON users.email = plans.created_by
            WHERE users.email = ${userEmail}
        `;

        const plansUpdated = plans.map((plan) => ({
            ...plan,
            created_at: new Date(plan.created_at).toLocaleDateString("en-US"),
        }));

        return NextResponse.json(plansUpdated);
    } catch (error) {
        console.error("Error fetching user plans:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

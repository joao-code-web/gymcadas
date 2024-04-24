import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../../lib/db";
import Month from "../../../../../lib/modals/Month";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);


        const pathname = url.pathname;


        const segments = pathname.split("/");
        const monthId = segments[segments.length - 1];



        if (!monthId) {
            return NextResponse.json({ message: "tem nn", status: 400 });
        }

        await connect();


        const MonthToId = await Month.findById(monthId);

        if (!MonthToId) {
            return NextResponse.json({ message: "tem hnn", status: 404 });
        }


        return NextResponse.json(MonthToId);
    } catch (error) {

        return NextResponse.json({ message: "error", status: 500 });
    }
}

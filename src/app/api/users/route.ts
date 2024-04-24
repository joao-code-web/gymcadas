
import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Users from "../../../../lib/modals/Users";
import { Types } from "mongoose";
import Month from "../../../../lib/modals/Month";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const monthId = searchParams.get("monthId");

        if (!monthId || !Types.ObjectId.isValid(monthId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid month ID" }),
                { status: 400 }
            );
        }

        await connect();

        const month = await Month.findById(monthId);
        if (!month) {
            return new NextResponse(
                JSON.stringify({ message: "Month not found" }),
                { status: 404 }
            );
        }


        const user = await Users.find({})

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {

        return new NextResponse(
            JSON.stringify({ message: "Error in GET", error }),
            { status: 500 }
        );
    }
};

export const POST = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const monthId = searchParams.get("monthId");

        const body = await req.json();
        const { nameuser, value, dataPag } = body;

        if (!monthId || !Types.ObjectId.isValid(monthId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid month ID" }),
                { status: 400 }
            );
        }

        await connect();

        const month = await Month.findById(monthId);
        if (!month) {
            return new NextResponse(
                JSON.stringify({ message: "Month not found" }),
                { status: 404 }
            );
        }

        const newUser = new Users({
            nameuser,
            value,
            dataPag,
            Month: new Types.ObjectId(monthId)
        });

        await newUser.save();

        return new NextResponse(
            JSON.stringify({ message: "User created", user: newUser }),
            { status: 201 }
        );

    } catch (error) {

        return new NextResponse(
            JSON.stringify({ message: "Error in POST", error }),
            { status: 500 }
        );
    }
};

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const monthId = searchParams.get("monthId");
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }),
                { status: 400 }
            );
        }

        if (!monthId || !Types.ObjectId.isValid(monthId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid month ID" }),
                { status: 400 }
            );
        }

        await connect(); // Conecte-se ao banco de dados

        const month = await Month.findById(monthId);
        if (!month) {
            return new NextResponse(
                JSON.stringify({ message: "Month not found" }),
                { status: 404 }
            );
        }

        const user = await Users.findOne({ _id: userId, Month: monthId }); // Corrigido para referenciar o modelo Month corretamente
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }), // Corrigido para "User not found"
                { status: 404 }
            );
        }

        await Users.findByIdAndDelete(userId);

        return new NextResponse(
            JSON.stringify({ message: "Note deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "Error in DELETE", error }),
            { status: 500 }
        );
    }
};
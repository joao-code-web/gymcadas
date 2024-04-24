import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Month from "../../../../lib/modals/Month";
import { Types } from "mongoose";

export const GET = async () => {
    try {
        await connect();
        const users = await Month.find();
        return NextResponse.json(users);
    } catch (error) {
        return new NextResponse("Error in fetching users: " + error, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const newMonth = new Month(body);
        await newMonth.save();
        return new NextResponse(JSON.stringify({ message: "criado", newMonth }));
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: "Error in creating User",
                error,
            }),
            { status: 500 }
        );
    }
};

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const monthId = searchParams.get("monthId");

        if (!monthId) {
            return NextResponse.json({ message: "tem nn", status: 400 })
        }

        await connect();

        const monthIdDelete = await Month.findById(monthId);

        if (!monthIdDelete) {
            return NextResponse.json({ message: "Esse usuario não existe", status: 400 });
        }


        await Month.findByIdAndDelete(new Types.ObjectId(monthId))
        return NextResponse.json({ message: "foi de vasco", status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "error", status: 500 });
    }
}

export const PATCH = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const monthId = searchParams.get("monthId");

        if (!monthId) {
            return NextResponse.json({ message: "O ID do mês não foi fornecido", status: 400 });
        }

        const body = await req.json();
        const { newMonth } = body;

        if (!newMonth) {
            return NextResponse.json({ message: "O novo nome do mês não foi fornecido", status: 400 });
        }

        if (!Types.ObjectId.isValid(monthId)) {
            return NextResponse.json({ message: "ID de mês inválido", status: 400 });
        }

        const updatedMonth = await Month.findByIdAndUpdate(
            monthId,
            { Month: newMonth },
            { new: true }
        );

        if (!updatedMonth) {
            return NextResponse.json({ message: "Este mês não existe ou não pôde ser atualizado", status: 404 });
        }

        return NextResponse.json({ message: "O mês foi atualizado com sucesso", updatedMonth, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro interno do servidor", status: 500 });
    }
};
;

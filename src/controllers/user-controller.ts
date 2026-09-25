import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { userSchema, userIdSchema } from "../validators/user-validators.js";



export async function createUser(req: Request, res: Response) {
  try {


    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            errors: result.error.issues.map((issue) => issue.message),
        });

        return;
    }

    const {name, email} = result.data;

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).json(user);
} catch (error) {
    console.error(error);

    if(
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
    ) {
        res.status(409).json({
            error: "Email já está cadastrado.",
        });

        return;
    }

    res.status(500).json({
        error: "Error interno do servidor"
    })
}
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro interno do servidor",
        })
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        
        if(!user) {
            res.status(404).json({
                error: "Usuário não encontrado.",
            });

            return;
        }

        res.status(200).json(user);
    } catch(error) {
        console.error(error);
    }
    
    res.status(500).json({
        error: "Erro interno do servidor.",
    });
}

export async function updateUser(req: Request, res: Response) {
    try {
        const idResult = userIdSchema.safeParse(req.params);

        if (!idResult.success) {
        res.status(400).json({
            errors: idResult.error.issues.map((issue) => issue.message),
        });

        return;
        }

        const bodyResult = userSchema.safeParse(req.body);

        if (!bodyResult.success) {
        res.status(400).json({
            errors: bodyResult.error.issues.map((issue) => issue.message),
        });

        return;
        }

        const { id } = idResult.data;
        const { name, email } = bodyResult.data;

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
            },
        });

        res.status(200).json(user);
    } catch(error) {
        console.error(error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            res.status(404).json({
                erro: "Usuário não encontrado.",
            });

            return;
        }

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            res.status(409).json({
                error: "Email já está cadastrado.",
            });

            return;
        }

        res.status(500).json({
            error: "Erro interno do servidor.",
        });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(204).send();
    } catch(error) {
        console.error(error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            res.status(404).json({
                error: "Usuário não encontrado.",
            });

            return;
        }

        res.status(500).json({
            error: "Erro interno do servidor.",
        });
    }
    
}
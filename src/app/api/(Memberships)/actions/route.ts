import { ActionApiService } from "@/apiServices/memberships/actionApiService";
import { TAction, TRegisterAction } from "@/models/memberships/action";
import { NextResponse } from "next/server";

const actionApiService = new ActionApiService()

export async function GET () {
	try {
		const actions = await actionApiService.getAll()
		return NextResponse.json(actions)
	} catch (error) {
		console.error("Failed to fetch section:", error)
		return NextResponse.json({ error: error }, { status: 500 })
	}
}

export async function POST (request: Request) {
	try {
		const newAction: TRegisterAction = await request.json()
		const createdAction = await actionApiService.register(newAction)
		return NextResponse.json(createdAction, { status: 201 })
	} catch (error) {
		console.error("Failed to register action:", error)
		return NextResponse.json({ error: "Failed to register action" }, { status: 500 })
	}
}

export async function PUT (request: Request) {
	try {
		const updatedAction: TAction = await request.json()
		const result = await actionApiService.update(updatedAction)
		return NextResponse.json(result)
	} catch (error) {
		console.error("Failed to update action:", error)
		return NextResponse.json({ error: "Failed to update action" }, { status: 500 })
	}
}

export async function DELETE (request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = String(searchParams.get("id"))
		await actionApiService.delete(id)
		return NextResponse.json({ message: "Action deleted successfully" })
	} catch (error) {
		console.error("Failed to delete action:", error)
		return NextResponse.json({ error: "Failed to delete action" }, { status: 500 })
	}
}

import { ModuleApiService } from "@/apiServices"
import { TModule } from "@/models"
import { NextResponse } from "next/server"

const moduleApiService = new ModuleApiService()

export async function GET () {
	try {
		const modules = await moduleApiService.getAll()
		return NextResponse.json(modules)
	} catch (error) {
		debugger;
		console.error("Failed to fetch module:", error)
		return NextResponse.json({ error: moduleApiService }, { status: 500 })
	}
}

export async function POST (request: Request) {
	try {
		const newModule: Omit<TModule, "id"> = await request.json()
		const createdModule = await moduleApiService.register(newModule)
		return NextResponse.json(createdModule, { status: 201 })
	} catch (error) {
		console.error("Failed to create user:", error)
		return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
	}
}

export async function PUT (request: Request) {
	try {
		const updatedUser: TModule = await request.json()
		const result = await moduleApiService.update(updatedUser)
		return NextResponse.json(result)
	} catch (error) {
		console.error("Failed to update user:", error)
		return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
	}
}

export async function DELETE (request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = String(searchParams.get("id"))
		await moduleApiService.delete(id)
		return NextResponse.json({ message: "User deleted successfully" })
	} catch (error) {
		console.error("Failed to delete user:", error)
		return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
	}
}

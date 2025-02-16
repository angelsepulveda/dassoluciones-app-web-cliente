import { SectionApiService } from "@/apiServices";
import { TRegisterSection, TSection } from "@/models";
import { NextResponse } from "next/server";

const sectionApiService = new SectionApiService()

export async function GET () {
	try {
		const sections = await sectionApiService.getAll()
		return NextResponse.json(sections)
	} catch (error) {
		console.error("Failed to fetch section:", error)
		return NextResponse.json({ error: sectionApiService }, { status: 500 })
	}
}

export async function POST (request: Request) {
	try {
		const newSection: TRegisterSection = await request.json()
		const createdSection = await sectionApiService.register(newSection)
		return NextResponse.json(createdSection, { status: 201 })
	} catch (error) {
		console.error("Failed to register section:", error)
		return NextResponse.json({ error: "Failed to register section" }, { status: 500 })
	}
}

export async function PUT (request: Request) {
	try {
		const updatedSection: TSection = await request.json()
		const result = await sectionApiService.update(updatedSection)
		return NextResponse.json(result)
	} catch (error) {
		console.error("Failed to update section:", error)
		return NextResponse.json({ error: "Failed to update section" }, { status: 500 })
	}
}

export async function DELETE (request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = String(searchParams.get("id"))
		await sectionApiService.delete(id)
		return NextResponse.json({ message: "Section deleted successfully" })
	} catch (error) {
		console.error("Failed to delete user:", error)
		return NextResponse.json({ error: "Failed to delete section" }, { status: 500 })
	}
}

import { User, QRProject, QRCode } from 'wasp/entities'
import { HttpError } from 'wasp/server'

type CreateProjectInput = {
  name: string
  description?: string
  file?: {
    content: string
    type: string
  }
}

export const getProjects = async (args: any, context: any) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.QRProject.findMany({
    where: { userId: context.user.id },
    include: { qrCodes: true },
    orderBy: { createdAt: 'desc' }
  })
}

export const getProjectById = async ({ id }: { id: string }, context: any) => {
  if (!context.user) { throw new HttpError(401) }

  const project = await context.entities.QRProject.findUnique({
    where: { id },
    include: { qrCodes: true }
  })

  if (!project || project.userId !== context.user.id) {
    throw new HttpError(404, 'Project not found')
  }

  return project
}

export const createProject = async ({ name, description, file }: CreateProjectInput, context: any) => {
  if (!context.user) { throw new HttpError(401) }

  const project = await context.entities.QRProject.create({
    data: {
      name,
      description,
      userId: context.user.id,
      settings: {}
    }
  })

  // Si se proporciona un archivo, crear QR codes
  if (file) {
    // Aquí iría la lógica para procesar el archivo y crear QR codes
    // Por ahora solo creamos uno de ejemplo
    await context.entities.QRCode.create({
      data: {
        content: file.content,
        projectId: project.id
      }
    })
  }

  return project
}

export const updateProject = async (
  { id, name, description, settings }: { id: string } & Partial<QRProject>,
  context: any
) => {
  if (!context.user) { throw new HttpError(401) }

  const project = await context.entities.QRProject.findUnique({ where: { id } })
  if (!project || project.userId !== context.user.id) {
    throw new HttpError(404, 'Project not found')
  }

  return context.entities.QRProject.update({
    where: { id },
    data: { name, description, settings }
  })
}

export const deleteProject = async ({ id }: { id: string }, context: any) => {
  if (!context.user) { throw new HttpError(401) }

  const project = await context.entities.QRProject.findUnique({ where: { id } })
  if (!project || project.userId !== context.user.id) {
    throw new HttpError(404, 'Project not found')
  }

  return context.entities.QRProject.delete({ where: { id } })
}

export const createQRCode = async (
  { projectId, content, label }: { projectId: string; content: string; label?: string },
  context: any
) => {
  if (!context.user) { throw new HttpError(401) }

  const project = await context.entities.QRProject.findUnique({ where: { id: projectId } })
  if (!project || project.userId !== context.user.id) {
    throw new HttpError(404, 'Project not found')
  }

  return context.entities.QRCode.create({
    data: {
      content,
      label,
      projectId
    }
  })
}

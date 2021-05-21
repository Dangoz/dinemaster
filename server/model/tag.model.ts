import { PrismaClient, Tag } from "@prisma/client"

export default class TagModel {
  private _prisma: PrismaClient = new PrismaClient();
  
  async getOrCreateTagsByNames(names: string[]): Promise<Tag[]> {

    // find tags
    let tags = await this._prisma.tag.findMany({
      where: {
        name: { in: names }
      }
    })

    // filter out names for creation
    const existingNames = tags.map(tag => tag.name);
    const newNames: string[] = names.filter(name => existingNames.indexOf(name) === - 1);
    const data: { name: string, hit: number }[] = newNames.map(name => { return { name, hit: 0 } })

    // create new tags
    const newTags = await this._prisma.tag.createMany({
      data
    })

    tags.concat(await this._prisma.tag.findMany({
      where: {
        name: { in: newNames }
      }
    }))

    return tags;
  }

  async getTagsByNames(names: string[]): Promise<Tag[]> {
    return;
  }
}
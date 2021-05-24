import { Tag } from "@prisma/client";
import prisma from "./prisma.client";

export default class TagModel {
  
  async getOrCreateTagsByNames(names: string[]): Promise<Tag[]> {

    // find tags
    const tags = await this.getTagsByNames(names);

    // filter out names for creation
    const existingNames = tags.map(tag => tag.name);
    const newNames: string[] = names.filter(name => existingNames.indexOf(name) === - 1);
    if (newNames.length === 0) return tags;

    // create new tags
    const data: { name: string, hit: number }[] = newNames.map(name => { return { name, hit: 0 } })
    await prisma.tag.createMany({
      data
    })

    const newTags = await this.getTagsByNames(newNames);

    return [...tags, ...newTags];
  }

  async getTagsByNames(names: string[]): Promise<Tag[]> {
    return await prisma.tag.findMany({
      where: {
        name: { in: names }
      }
    });
  }


}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownContent(slugParts: string[], lang: string) {
  // Join the parts and add the language suffix
  // e.g. ['home'] -> 'home/index.de.md'
  // e.g. ['produkte', 'direktsaft'] -> 'produkte/direktsaft/index.de.md'
  
  let relativePath = '';
  
  if (slugParts[0] === 'home') {
    relativePath = `home/index.${lang}.md`;
  } else if (slugParts[0] === 'global') {
    relativePath = `global/${slugParts[1]}.${lang}.md`;
  } else {
    // For products or other pages
    const slugStr = slugParts.join('/');
    relativePath = `${slugStr}/index.${lang}.md`;
  }

  const fullPath = path.join(contentDirectory, relativePath);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the metadata section
    const matterResult = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
      
    const contentHtml = processedContent.toString();
    
    return {
      relativePath,
      contentHtml,
      ...matterResult.data,
    } as any;
  } catch (e) {
    console.error(`Could not read markdown file: ${fullPath}`);
    return null;
  }
}

export function getAllProducts(lang: string) {
  const produkteDir = path.join(contentDirectory, 'produkte');
  const productFolders = fs.readdirSync(produkteDir);
  
  const products = productFolders.map(folder => {
    const fullPath = path.join(produkteDir, folder, `index.${lang}.md`);
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        slug: folder,
        ...matterResult.data,
      } as any;
    } catch (e) {
      return null;
    }
  }).filter(p => p !== null);
  
  return products;
}

export function getAllSorten(lang: string) {
  const sortenDir = path.join(contentDirectory, 'sorten');
  if (!fs.existsSync(sortenDir)) return [];
  
  const sortenFolders = fs.readdirSync(sortenDir);
  
  const sorten = sortenFolders.map(folder => {
    const fullPath = path.join(sortenDir, folder, `index.${lang}.md`);
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        slug: folder,
        ...matterResult.data,
        note: matterResult.content.trim(), // The markdown body acts as the note
      } as any;
    } catch (e) {
      return null;
    }
  }).filter(p => p !== null);
  
  // Sort by order field
  return sorten.sort((a, b) => (a.order || 0) - (b.order || 0));
}

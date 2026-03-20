import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import Image from 'next/image';
import logoFull from '@/app/images/logo-full.webp';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;


  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>
        <div className='flex items-center gap-x-3'>
          {page.url === "/docs" ? <Image src={logoFull} alt="Quasar" width={250} height={100} className='w-42' /> : (
            page.data.title
          )}
        </div>
      </DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const isIndex = !params.slug || params.slug.length === 0;

  return {
    title: isIndex
      ? { absolute: 'Quasar — Zero-Copy Solana Framework' }
      : page.data.title,
    description: page.data.description,
  };
}

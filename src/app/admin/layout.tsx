import Header from '@/components/admin/layout/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="h-full">
        <main className="flex flex-col items-center justify-between">
          <Header />
          <article className="w-full min-[1440px]:w-[1440px] flex flex-col items-center justify-between gap-[56px]">
            <div className="flex w-full flex-col justify-between">
              <section className="flex w-full flex-col gap-[24px] md:px-24 md:py-12 pt-4 px-[16px]">
                {children}
              </section>
              {/*Hack to fix the mobile bottom navigation*/}
              <div className="h-[80px] md:hidden"></div>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}

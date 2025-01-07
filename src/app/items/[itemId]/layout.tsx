export default function ItemDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={
        'laptop:bg-white max-w-[1200px] w-full px-4 laptop:px-[102px] laptop:min-h-[calc(100dvh-61px)] pb-10 mx-auto leading-[1.125] '
      }
    >
      {children}
    </main>
  );
}

import type { ReactNode } from "react";


type Props = { items: ReactNode[]; twoColumns?: boolean };

export default function StarList({ items, twoColumns = false }: Props) {
  return (
    <ul className="mb-4 flex flex-wrap p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className={`my-[5px] flex list-none items-start justify-start gap-[7px] ${
            twoColumns ? "basis-full min-[576px]:basis-[49%]" : "basis-full"
          }`}
        >
          <img src="/images/landing/staricon.png" alt="" width={34} height={35} className="h-auto w-[26px] shrink-0" />
          <p className="mb-0 max-md:text-[13px]">{item}</p>
        </li>
      ))}
    </ul>
  );
}

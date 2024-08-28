import Image from "next/image";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        {/* <img 
        src="https://e1.pxfuel.com/desktop-wallpaper/1022/228/desktop-wallpaper-cool-anime-for-ps4-ps4-banners-anime-girl.jpg"
        alt="SEO Optimization alt needed"
        layout="fill"
        objectfit="cover"
        /> */}
    </div>
  );

export const items = [
    {
      title: "Test 1",
      description: "Testing the first item",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <Image src="https://e1.pxfuel.com/desktop-wallpaper/1022/228/desktop-wallpaper-cool-anime-for-ps4-ps4-banners-anime-girl.jpg" alt="Icon" width={16} height={16} />,
      link: "https://www.google.com"
    },
    {
      title: "Test 2",
      description: "Testing the second item",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <Image src="https://e1.pxfuel.com/desktop-wallpaper/1022/228/desktop-wallpaper-cool-anime-for-ps4-ps4-banners-anime-girl.jpg" alt="Icon" width={16} height={16} />,        },
    {
      title: "Test 3",
      description: "Testing the third item",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <Image src="https://e1.pxfuel.com/desktop-wallpaper/1022/228/desktop-wallpaper-cool-anime-for-ps4-ps4-banners-anime-girl.jpg" alt="Icon" width={16} height={16} />,        },
    {
      title: "Test 4",
      description:
        "Testing the fourth item with a longer description",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <Image src="https://e1.pxfuel.com/desktop-wallpaper/1022/228/desktop-wallpaper-cool-anime-for-ps4-ps4-banners-anime-girl.jpg" alt="Icon" width={16} height={16} />,        },
  ];
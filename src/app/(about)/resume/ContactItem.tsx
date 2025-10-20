/* eslint-disable jsx-a11y/alt-text */
import { View, Image, Link, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 8,
    fontWeight: 400,
    gap: 6,
    width: "40%",
  },
  link: {
    textDecoration: "none",
  },
  image: {
    width: 8,
    height: 8,
    alignSelf: "flex-start",
  },
  text: {
    textAlign: "left",
  },
});

export interface Props {
  id?: number;
  isLink?: boolean;
  href?: string;
  text: string;
  image?: string;
}

const ContactItem = ({ isLink, href, text, image }: Props) => {
  return (
    <View style={styles.container}>
      {image && <Image src={image} style={styles.image} />}
      {isLink ? (
        <Link src={href} style={styles.link}>
          <Text style={styles.text}>{text}</Text>
        </Link>
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
};

export default ContactItem;

// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @next/next/no-img-element */
// import { ContactType } from "@/components/types";
// interface Props {
//   image: string;
//   text: string;
//   type?: ContactType;
//   href?: string;
// }
// const stripScheme = (text: string) => {
//   if (text.includes("://")) {
//     return text.substring(text.indexOf("://") + 3);
//   }

//   return text;
// };
// const ContactItem = ({ image, text, type = "text", href = text }: Props) => {
//   return (
//     <div className="w-[50%] flex justify-start items-center gap-1">
//       <img src={image} className="w-3 h-3" />
//       {type === "link" && (
//         <a
//           href={href}
//           target="_blank"
//           className="h-full flex justify-start items-center text-blue-300"
//         >
//           {stripScheme(text)}
//         </a>
//       )}
//       {type === "email" && (
//         <a
//           href={`mailto:${text}`}
//           className="h-full flex justify-start items-center text-blue-300"
//         >
//           {text}
//         </a>
//       )}
//       {type === "tel" && (
//         <a
//           href={`tel:${text}`}
//           className="h-full flex justify-start items-center text-blue-300"
//         >
//           {text}
//         </a>
//       )}
//       {type === "text" && (
//         <span className="h-full flex justify-start items-center">{text}</span>
//       )}
//     </div>
//   );
// };

// export default ContactItem;

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

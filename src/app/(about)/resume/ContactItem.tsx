import {
  View,
  Image as PDFImage,
  Link,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 10,
    fontWeight: 400,
    gap: 6,
    width: "33%",
  },
  link: {
    textDecoration: "none",
  },
  image: {
    width: 10,
    height: 10,
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
      {image && <PDFImage src={image} style={styles.image} />}
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

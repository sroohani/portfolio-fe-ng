import { Text, StyleSheet, View, Image as PDFImage } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  education: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 8,
    fontWeight: 400,
    marginTop: 4,
    marginBottom: 4,
    width: "100%",
  },
  university: {
    width: 8,
    height: 8,
    marginRight: 4,
  },
});

interface Props {
  title: string;
}

const Education = ({ title }: Props) => {
  return (
    <View style={styles.education}>
      <PDFImage style={styles.university} src="/images/resume/university.png" />
      <Text>{title}</Text>
    </View>
  );
};

export default Education;

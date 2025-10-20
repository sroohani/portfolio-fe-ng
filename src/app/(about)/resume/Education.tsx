/* eslint-disable jsx-a11y/alt-text */

import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  academicSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 2,
    marginBottom: 4,
  },
  university: {
    width: 8,
    height: 8,
  },
  academic: {
    fontSize: 8,
    fontWeight: 400,
    alignSelf: "flex-start",
    paddingLeft: 0.8,
    paddingRight: 0.8,
  },
});

interface Props {
  title: string;
}

const Education = ({ title }: Props) => {
  return (
    <View style={styles.academicSection}>
      <Image
        style={styles.university}
        src="public/images/resume/university.png"
      />
      <Text style={styles.academic}>{title}</Text>
    </View>
  );
};

export default Education;

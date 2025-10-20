import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  language: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 8,
    fontWeight: 400,
    marginTop: 8,
    marginBottom: 8,
    paddingBottom: 4,
    width: "30%",
    gap: 2,
  },
  name: {
    width: "50%",
    fontWeight: "600",
  },
});

interface Props {
  name: string;
  level: string;
}

const Language = ({ name, level }: Props) => {
  return (
    <View style={styles.language}>
      <Text style={styles.name}>{name}</Text>
      <Text>{level}</Text>
    </View>
  );
};

export default Language;

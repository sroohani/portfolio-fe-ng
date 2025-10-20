import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
    marginBottom: 7,
  },
  title: {
    fontSize: 8,
    fontWeight: 600,
    alignSelf: "flex-start",
    width: "20%",
  },
  skills: {
    fontSize: 7,
    fontWeight: 400,
    alignSelf: "flex-start",
    width: "80%",
  },
});

interface Props {
  title: string;
  skills: string[];
}
const Skill = ({ title, skills }: Props) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.skills}>{skills.join(", ")}</Text>
    </View>
  );
};

export default Skill;

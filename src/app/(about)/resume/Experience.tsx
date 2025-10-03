import { View, Text, Image as PDFImage, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  years: {
    textAlign: "center",
    borderBottom: 0.3,
    paddingBottom: 0.3,
    marginTop: 4,
    marginBottom: 1,
    fontSize: 8,
    fontWeight: 600,
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 8,
    fontWeight: 600,
    alignSelf: "flex-start",
    paddingLeft: 0.8,
    paddingRight: 0.8,
    marginTop: 4,
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    fontWeight: 400,
    alignSelf: "flex-start",
    paddingLeft: 0.8,
    paddingRight: 0.8,
    marginTop: 2,
    marginBottom: 6,
  },
  project: {
    display: "flex",
    flexDirection: "row",
    fontSize: 8,
    fontWeight: 400,
    marginBottom: 4,
  },
  chevronRight: {
    width: 8,
    height: 8,
  },
});

interface Props {
  from: string;
  to: string;
  companies: string[];
  positions: string[];
  projects: string[];
}
const Experience = ({ from, to, companies, positions, projects }: Props) => {
  return (
    <View wrap={false}>
      <Text style={styles.years}>
        {from} to {to}
      </Text>
      <Text style={styles.title}>Companies:</Text>
      <Text style={styles.description}>{companies.join(", ")}</Text>
      <Text style={styles.title}>Positions:</Text>
      <Text style={styles.description}>{positions.join(", ")}</Text>
      <Text style={styles.title}>Projects:</Text>
      {projects.map((project, index) => (
        <View style={styles.project} key={index}>
          <PDFImage
            style={styles.chevronRight}
            src="/images/resume/chevron-right.png"
          />
          <Text>{project}</Text>
        </View>
      ))}
    </View>
  );
};

export default Experience;

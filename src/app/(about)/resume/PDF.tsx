import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
import { trimmedLinkText } from "./utils";
import styles from "./styles";
import resumeJson from "@/assets/json/resume.json";
import ContactItem from "./ContactItem";
import Skill from "./Skill";
import Experience from "./Experience";
import Language from "./Language";
import Education from "./Education";

const PDF = () => {
  Font.registerHyphenationCallback((word) => [word]);

  return (
    <Document
      style={styles.document}
      title={`${resumeJson.header.name} - CV`}
      author={resumeJson.header.name}
      subject="Curriculum Vitae"
      keywords="Software developer;C;Modern C++;HTML;CSS;JavaScript;TypeScript;React;Next;Go;Python"
      language="en-US"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>{resumeJson.header.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Software developer</Text>
        </View>
        <View style={styles.contact}>
          <ContactItem
            isLink={false}
            image="/images/resume/map-pin.png"
            text={resumeJson.header.location}
          />
          <ContactItem
            isLink={false}
            image="/images/resume/mail.png"
            text={resumeJson.header.email}
          />
          <ContactItem
            isLink={false}
            image="/images/resume/smartphone.png"
            text={resumeJson.header.cellphone}
          />
          <ContactItem
            isLink={true}
            href={resumeJson.header.website}
            text={trimmedLinkText(resumeJson.header.website)}
            image="/images/resume/globe.png"
          />
          <ContactItem
            isLink={true}
            href={resumeJson.header.github}
            text={trimmedLinkText(resumeJson.header.github)}
            image="/images/resume/github.png"
          />
          <ContactItem
            isLink={true}
            href={resumeJson.header.linkedin}
            text={trimmedLinkText(resumeJson.header.linkedin)}
            image="/images/resume/InBug-Black.png"
          />
        </View>
        <Text style={styles.aboutMe}>{resumeJson.summary}</Text>
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {resumeJson.skills.map((skill, index) => (
            <Skill title={skill.title} skills={skill.skills} key={index} />
          ))}
        </View>
        <View style={styles.experienceSection}>
          <Text style={styles.sectionTitle}>Professional background</Text>
          {resumeJson.professionalExperience.map((item, index) => (
            <Experience {...item} key={index} />
          ))}
        </View>
        <View style={styles.academicSection}>
          <Text style={styles.sectionTitle}>Academic background</Text>
          {resumeJson.education.map((bg, index) => (
            <Education title={bg} key={index} />
          ))}
        </View>
        <View style={styles.languagesSection}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {resumeJson.languages.map((language, index) => (
            <Language {...language} key={index} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;

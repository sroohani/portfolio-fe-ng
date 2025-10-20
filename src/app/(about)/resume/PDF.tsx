import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
import resumeJson from "@/assets/json/resume.json";
import Skill from "./Skill";
import Experience from "./Experience";
import Education from "./Education";
import Language from "./Language";
import styles from "./styles";
import ContactItem from "./ContactItem";

export const trimmedLinkText = (href: string): string => {
  let trimmed: string;

  if (href.startsWith("https://")) {
    trimmed = href.substring(8);
  } else if (href.startsWith("http://")) {
    trimmed = href.substring(7);
  } else {
    trimmed = href;
  }

  return trimmed;
};

const PDF = () => {
  Font.registerHyphenationCallback((word) => [word]);

  return (
    <Document
      style={styles.document}
      title={`${resumeJson.header.name} - CV`}
      author={resumeJson.header.name}
      subject="Curriculum Vitae"
      keywords="Software developer;C;Modern C++;HTML;CSS;JavaScript;TypeScript;React;Next;Vue;Nuxt;Go;Python;REST;gRPC;Protobuf;ORM"
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
            isLink={true}
            image="public/images/resume/map-pin.png"
            text={resumeJson.header.location}
            href={resumeJson.header.map}
          />
          <ContactItem
            isLink={true}
            image="public/images/resume/mail.png"
            text={resumeJson.header.email}
            href={`mailto:${resumeJson.header.email}`}
          />
          <ContactItem
            isLink={true}
            image="public/images/resume/smartphone.png"
            text={resumeJson.header.cellphone}
            href={`tel:${resumeJson.header.cellphone}`}
          />
          <ContactItem
            isLink={true}
            href={resumeJson.header.website}
            text={trimmedLinkText(resumeJson.header.website)}
            image="public/images/resume/globe.png"
          />
          <ContactItem
            isLink={true}
            href={resumeJson.header.github}
            text={trimmedLinkText(resumeJson.header.github)}
            image="public/images/resume/github.png"
          />
          <ContactItem
            isLink={true}
            href={resumeJson.header.linkedin}
            text={trimmedLinkText(resumeJson.header.linkedin)}
            image="public/images/resume/InBug-Black.png"
          />
        </View>
        <Text style={styles.aboutMe}>{resumeJson.summary}</Text>
        <View style={styles.domainsSection}>
          <Text style={styles.domainsSectionTitle}>Domains of Experience</Text>
          <Text style={styles.domainsSectionText}>
            {resumeJson.domains.join(", ")}
          </Text>
        </View>
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
          {resumeJson.education.map((education, index) => (
            <Education title={education} key={index} />
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

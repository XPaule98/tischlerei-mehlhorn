import React from "react";
import { Stack, Button, Card, Text } from "@sanity/ui";
import { set, type ArrayOfObjectsInputProps } from "sanity";

export const DEFAULT_STORY_BLOCKS = [
  {
    _type: "block",
    _key: "block1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        marks: [],
        text: "Die Geschichte unserer Tischlerei begann im ",
      },
      {
        _type: "span",
        _key: "s2",
        marks: ["strong"],
        text: "Januar 1977",
      },
      {
        _type: "span",
        _key: "s3",
        marks: [],
        text: ", als Roland Mehlhorn den Schritt in die Selbstständigkeit wagte. Was mit traditionellem Gestellbau und solider Handarbeit seinen Anfang nahm, wuchs über die Jahrzehnte durch kontinuierliche Weiterentwicklung und kompromisslose Qualitätsorientierung zu einem festen Begriff im Westerzgebirge heran.",
      },
    ],
  },
  {
    _type: "block",
    _key: "block2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s4",
        marks: ["strong"],
        text: "1992",
      },
      {
        _type: "span",
        _key: "s5",
        marks: [],
        text: " folgte der Neubau des heutigen Firmengebäudes in der ",
      },
      {
        _type: "span",
        _key: "s6",
        marks: ["strong"],
        text: "Neuheider Straße 64 b",
      },
      {
        _type: "span",
        _key: "s7",
        marks: [],
        text: " – mit großzügigen Werkstatträumen und modernem Maschinenpark. Seit ",
      },
      {
        _type: "span",
        _key: "s8",
        marks: ["strong"],
        text: "Juli 2012",
      },
      {
        _type: "span",
        _key: "s9",
        marks: [],
        text: " führt Tischlermeister ",
      },
      {
        _type: "span",
        _key: "s10",
        marks: ["strong"],
        text: "Ronny Mehlhorn",
      },
      {
        _type: "span",
        _key: "s11",
        marks: [],
        text: " die Geschicke des Familienunternehmens in zweiter Generation. Dabei verbinden wir überlieferte Handwerkstradition mit modernster Profiltechnik (wie dem System Gutmann Mira) und zukunftssicherer Isoliertechnologie.",
      },
    ],
  },
  {
    _type: "block",
    _key: "block3",
    style: "blockquote",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s12",
        marks: [],
        text: "„Wir verbinden überlieferte Handwerkstradition mit modernster Fertigungstechnik. Holz ist für uns lebendige Natur – und jedes gefertigte Bauteil ein dauerhafter Wert für Generationen.“\n– Tischlermeister Ronny Mehlhorn",
      },
    ],
  },
  {
    _type: "block",
    _key: "block4",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s13",
        marks: [],
        text: "Für uns ist Holz nicht bloß ein Werkstoff, sondern lebendige Natur. Wir verarbeiten vorrangig hochwertige heimische Hölzer wie ",
      },
      {
        _type: "span",
        _key: "s14",
        marks: ["strong"],
        text: "Eiche, Kiefer und Lärche",
      },
      {
        _type: "span",
        _key: "s15",
        marks: [],
        text: ". Jedes Fenster, jede Haustür und jeder Wintergarten verlässt unsere Werkstatt erst, wenn Passgenauigkeit, Oberflächenveredelung und Funktionalität höchsten meisterlichen Ansprüchen genügen.",
      },
    ],
  },
];

export function StoryContentInput(props: ArrayOfObjectsInputProps) {
  const { onChange, value } = props;

  const handleInsertDefaults = () => {
    onChange(set(DEFAULT_STORY_BLOCKS));
  };

  const isEmpty = !value || value.length === 0;

  return (
    <Stack space={3}>
      {isEmpty && (
        <Card padding={3} radius={2} tone="primary" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Vorlage für Firmengeschichte verfügbar:
            </Text>
            <Text size={1} muted>
              Klicken Sie hier, um den bisherigen Text mit Meilensteinen & Zitat direkt in den Editor einzufügen:
            </Text>
            <Button
              text="✨ Standard-Geschichte & Zitat hier einfügen"
              tone="primary"
              fontSize={1}
              padding={3}
              onClick={handleInsertDefaults}
            />
          </Stack>
        </Card>
      )}
      {props.renderDefault(props)}
    </Stack>
  );
}

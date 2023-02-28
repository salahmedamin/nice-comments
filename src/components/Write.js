import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
  Popover
} from "@draft-js-plugins/mention";
import { convertToRaw, EditorState } from "draft-js";
import React, { useCallback, useMemo, useRef, useState } from "react";
import "./DraftJS.css";
import mentionStyles from "./MentionsStyles.module.css";
import editorStyles from "./SimpleMentionEditor.module.css";
import Snippet from "./Snippet";

const mentions = [
  {
    name: "Matthew Russell",
    link: "https://twitter.com/mrussell247",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    name: "Julian Krispel-Samsel",
    link: "https://twitter.com/juliandoesstuff",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    name: "Jyoti Puri",
    link: "https://twitter.com/jyopur",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    name: "Max Stoiber",
    link: "https://twitter.com/mxstbr",
    avatar: "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4",
  },
  {
    name: "Nik Graf",
    link: "https://twitter.com/nikgraf",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    name: "Pascal Brandt",
    link: "https://twitter.com/psbrandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
];

// const customStyleMap = Array.from(Array(60).keys())
//   .filter((e) => e)
//   .reduce(
//     (tot, next) =>
//       (tot = { ...tot, [`FONT_SIZE_${next}`]: { fontSize: `${next}px` } }),
//     {}
//   );
export const Write = ({ before = <></>, after = <></> }) => {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  window.ES = convertToRaw(editorState.getCurrentContent());
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      theme: mentionStyles,
      // positionSuggestions => css
      mentionComponent(mentionProps) {
        return (
          <span
            className={mentionProps.className}
            style={{
              width: "auto",
            }}
          >
            <Snippet
              style={{
                display: "inline-flex",
              }}
              imageStyle={{
                width: 20,
                height: 20,
              }}
              hideBackButton={true}
              text={mentionProps.mention.name}
              image={mentionProps.mention.avatar}
              forceHover={true}
            />
          </span>
        );
      },
    });
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  {
    /*<div style={{borderTop: "1px solid rgb(80,80,80)",display: "flex",flexDirection: "column",paddingTop: 5,}}>
      <Typography fontSize={14}>Express yourself</Typography> */
  }
  return (
    <div
      className={editorStyles.editor}
      style={{
        borderTop: "1px solid rgb(80,80,80)",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => {
        ref.current?.focus();
      }}
    >
      {before}
      <Editor
        editorKey={"editor"}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
        placeholder={"Give your thoughts a chance"}
        // customStyleMap={customStyleMap}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        popoverContainer={({ children, popperOptions, ...props }) => {
          return (
            <Popover
              popperOptions={{
                ...popperOptions,
                placement: "right-end",
                modifiers: [
                  {
                    name: "offset",
                    enabled: true,
                    options: {
                      offset: [-10, 30],
                    },
                  },
                ],
              }}
              {...props}
            >
              <div style={{ padding: 10 }}>{children}</div>
            </Popover>
          );
        }}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
      {after}
    </div>
  );
  {
    /*</div>*/
  }
};

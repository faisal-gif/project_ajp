import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function InputEditor({ value, onChange }) {
    return (
        <Editor

            tinymceScriptSrc="/vendor/tinymce/tinymce.min.js"
            referrerPolicy='origin'
            value={value}
            onEditorChange={(content, editor) => {
                onChange(content);
            }}

            // 3. Konfigurasi Fitur Lengkap
            init={{
                license_key: 'gpl',
                height: 500,
                forced_root_block: 'p',
                noneditable_class: 'instagram-media',
                extended_valid_elements: '+script[language|type|src]',
                inputMode: 'text',
                contextmenu: false,
                quickbars_insert_toolbar: false,
                quickbars_selection_toolbar: false,
                mobile: {
                    menubar: false,
                    toolbar_mode: 'wrap',
                },

                plugins: [
                    'searchreplace', 'lists', 'advlist', 'link',
                    'charmap', 'pagebreak', 'nonbreaking',
                    'visualblocks', 'visualchars', 'fullscreen',
                    'insertdatetime', 'table', 'help',
                    'wordcount'
                ],
                toolbar:
                    'bold italic underline strikethrough | link | ' +
                    'numlist bullist | ' +
                    'outdent indent | ' +
                    'blockquote | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'ltr rtl | ' +
                    'hr pagebreak | ',
                image_title: true,
                file_picker_types: '',
                image_advtab: false,
                automatic_uploads: false,
                menubar: false,
                branding: false,
                promotion: false,
                paste_preprocess: (plugin, args) => {
                    // Regex Unicode modern untuk mendeteksi semua rentang karakter emoji
                    const emojiRegex = /[\p{Extended_Pictographic}\p{Emoji_Presentation}]/gu;
                    args.content = args.content.replace(emojiRegex, '');
                },
                paste_postprocess: (plugin, args) => {
                    args.node.querySelectorAll("span").forEach(el => {
                        el.replaceWith(...el.childNodes); // unwrap span
                    });
                    args.node.querySelectorAll("o\\:p").forEach(el => el.remove());
                    args.node.querySelectorAll("*").forEach(el => {
                        el.removeAttribute("class");
                        el.style.fontFamily = "";
                        el.style.fontSize = "";
                        el.style.lineHeight = "";
                    });
                },
                content_style: 'body { font-size:14px } img { max-width:100%; height:auto; }',
            }}
        />
    );
}
/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoJgNARCB0Cs0AYKQIwhAgbJkB2AnACz4iYIG6UDMCCIKxAHFSI/Qfc5odochAGsA9sgRhgKMGLGTJCALqQqAMwBGsRgBNVEeUA=
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor, Alignment, Autoformat, AutoImage, AutoLink,
	Autosave, BlockQuote, Bold, Bookmark, Code,
	CodeBlock, Emoji, Essentials, FindAndReplace, FontBackgroundColor,
	FontColor, FontFamily, FontSize, FullPage, Fullscreen,
	GeneralHtmlSupport, Heading, Highlight, HorizontalLine, HtmlComment,
	HtmlEmbed, ImageBlock, ImageCaption, ImageEditing, ImageInline,
	ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative,
	ImageToolbar, ImageUpload, ImageUtils, Indent, IndentBlock,
	Italic, Link, LinkImage, List, ListProperties,
	MediaEmbed, Mention, PageBreak, Paragraph, PasteFromMarkdownExperimental,
	PasteFromOffice, PlainTableOutput, RemoveFormat, ShowBlocks, SimpleUploadAdapter,
	SourceEditing, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials,
	SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, Strikethrough, Style,
	Subscript, Superscript, Table, TableCaption, TableCellProperties,
	TableColumnResize, TableLayout, TableProperties, TableToolbar, TextPartLanguage,
	TextTransformation, TodoList, Underline, HeadingOption
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';

import 'ckeditor5/ckeditor5.css';

import styles from './Editor.module.css';

interface EditorProps {
	onChange: (data: string) => void;
}

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export const Editor = ({ onChange }: EditorProps) => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<HTMLDivElement>(null);
	const editorMenuBarRef = useRef<HTMLDivElement>(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = useMemo(() => {
		if (!isLayoutReady) {
			return undefined;
		}

		return {
			toolbar: {
				items: [
					'sourceEditing', 'showBlocks', 'fullscreen', '|',
					'heading', 'style', '|',
					'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
					'bold', 'italic', 'underline', '|',
					'link', 'insertImage', 'insertTable', 'insertTableLayout', 'highlight', 'blockQuote', 'codeBlock', '|',
					'alignment', '|',
					'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				Alignment, Autoformat, AutoImage, AutoLink, Autosave,
				BlockQuote, Bold, Bookmark, Code, CodeBlock,
				Emoji, Essentials, FindAndReplace, FontBackgroundColor, FontColor,
				FontFamily, FontSize, FullPage, Fullscreen, GeneralHtmlSupport,
				Heading, Highlight, HorizontalLine, HtmlComment, HtmlEmbed,
				ImageBlock, ImageCaption, ImageEditing, ImageInline, ImageInsert,
				ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar,
				ImageUpload, ImageUtils, Indent, IndentBlock, Italic,
				Link, LinkImage, List, ListProperties, MediaEmbed,
				Mention, PageBreak, Paragraph, PasteFromMarkdownExperimental, PasteFromOffice,
				PlainTableOutput, RemoveFormat, ShowBlocks, SimpleUploadAdapter, SourceEditing,
				SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin,
				SpecialCharactersMathematical, SpecialCharactersText, Strikethrough, Style, Subscript,
				Superscript, Table, TableCaption, TableCellProperties, TableColumnResize,
				TableLayout, TableProperties, TableToolbar, TextPartLanguage, TextTransformation,
				TodoList, Underline
			],
			simpleUpload: {
				uploadUrl: '',
				headers: {

				},
			},
			fontFamily: {
				supportAllValues: true,
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			fullscreen: {
				onEnterCallback: (container: HTMLElement) =>
					container.classList.add(
						'editor-container',
						'editor-container_classic-editor',
						'editor-container_include-style',
						'editor-container_include-fullscreen',
						'main-container'
					)
			},
			heading: {
				options: [
					{
						model: 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				] as HeadingOption[]
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true as const,
						attributes: true as const,
						classes: true as const,
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption', 'imageTextAlternative', '|',
					'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
					'resizeImage'
				]
			},
			initialData:
				'',
			language: 'ko',
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual' as const,
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			list: {
				properties: {
					styles: true,
					startIndex: true,
					reversed: true
				}
			},
			mention: {
				feeds: [
					{
						marker: '@',
						feed: [
							/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
						]
					}
				]
			},
			menuBar: {
				isVisible: true
			},
			placeholder: '',
			style: {
				definitions: [
					{
						name: 'Article category',
						element: 'h3',
						classes: ['category']
					},
					{
						name: 'Subtitle',
						element: 'h3',
						classes: ['document-subtitle']
					},
					{
						name: 'Info box',
						element: 'p',
						classes: ['info-box']
					},
					{
						name: 'CTA Link Primary',
						element: 'a',
						classes: ['button', 'button--green']
					},
					{
						name: 'CTA Link Secondary',
						element: 'a',
						classes: ['button', 'button--black']
					},
					{
						name: 'Marker',
						element: 'span',
						classes: ['marker']
					},
					{
						name: 'Spoiler',
						element: 'span',
						classes: ['spoiler']
					}
				]
			},
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
			},
			translations: [translations]
		};
	}, [isLayoutReady]);

	return (
		<div className={styles['main-container']}>
			<div
				className={[
					styles['editor-container'],
					styles['editor-container_classic-editor'],
					styles['editor-container_include-style'],
					styles['editor-container_include-fullscreen']
				].join(' ')}
				ref={editorContainerRef}
			>
				<div className={styles['editor-container__editor']}>
					<div ref={editorRef}>
						{editorConfig && (
							<CKEditor
								onReady={(editor) => {

									const menuBarElement = editor.ui.view.menuBarView?.element;

									if (editorMenuBarRef.current && menuBarElement) {
										editorMenuBarRef.current.appendChild(menuBarElement);
									}
								}}
								onAfterDestroy={() => {

									if (editorMenuBarRef.current) {
										Array.from(editorMenuBarRef.current.children).forEach(child => child.remove());
									}
								}}
								editor={ClassicEditor}
								config={editorConfig}
								onChange={(_, editor) => {
									const data = editor.getData();
									console.log(data);
									onChange(data);
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-tooltip";
import { Tooltip } from "react-tooltip";

function BookEditor() {
  const [title, setTitle] = useState("");
  const author = "Siya Pandey";
  const [pages, setPages] = useState([{ name: "", content: "" }]);
  const lastPageRef = useRef(null);

  const generateEbook = () => {
    const zip = new JSZip();

    const mimetype = "application/epub+zip";
    zip.file("mimetype", mimetype);

    const container =
      '<?xml version="1.0"?>' +
      '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">' +
      "  <rootfiles>" +
      '    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml" />' +
      "  </rootfiles>" +
      "</container>";
    zip.file("META-INF/container.xml", container);

    const metadata =
      '<?xml version="1.0"?>' +
      '<package version="3.0" xml:lang="en" xmlns="http://www.idpf.org/2007/opf" unique-identifier="book-id">' +
      '  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">' +
      '    <dc:identifier id="book-id">urn:uuid:B9B412F2-CAAD-4A44-B91F-A375068478A0</dc:identifier>' +
      '    <meta refines="#book-id" property="identifier-type" scheme="xsd:string">uuid</meta>' +
      '    <meta property="dcterms:modified">2000-03-24T00:00:00Z</meta>' +
      "    <dc:language>en</dc:language>" +
      `    <dc:title>${title}</dc:title>` +
      `    <dc:creator>${author}</dc:creator>` +
      "  </metadata>" +
      "  <manifest>" +
      pages
        .map(
          (_, index) =>
            `<item id="page${index}" href="page${index}.xhtml" media-type="application/xhtml+xml"/>`
        )
        .join("") +
      '    <item id="toc" href="toc.ncx" media-type="application/x-dtbncx+xml"/>' +
      "  </manifest>" +
      '  <spine toc="toc">' +
      pages.map((_, index) => `<itemref idref="page${index}"/>`).join("") +
      "  </spine>" +
      "</package>";
    zip.file("OEBPS/content.opf", metadata);

    const toc =
      '<?xml version="1.0"?>' +
      '<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">' +
      "  <head>" +
      '    <meta name="dtb:uid" content="urn:uuid:B9B412F2-CAAD-4A44-B91F-A375068478A0"/>' +
      '    <meta name="dtb:depth" content="1"/>' +
      '    <meta name="dtb:totalPageCount" content="0"/>' +
      '    <meta name="dtb:maxPageNumber" content="0"/>' +
      "  </head>" +
      "  <docTitle>" +
      `    <text>${title}</text>` +
      "  </docTitle>" +
      "  <navMap>" +
      pages
        .map(
          (_, index) =>
            `<navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">` +
            `  <navLabel>` +
            `    <text>Page ${index + 1}</text>` +
            `  </navLabel>` +
            `  <content src="page${index}.xhtml"/>` +
            `</navPoint>`
        )
        .join("") +
      "  </navMap>" +
      "</ncx>";
    zip.file("OEBPS/toc.ncx", toc);

    pages.forEach((page, index) => {
      const cssForTextSelection = `
    <style>
       body, p, h1, h2, h3, h4, h5, h6, span, div {
      user-select: text !important;
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
    }
    </style>
  `;
      const sanitizedContent = page.content
        .replace(/&nbsp;/g, "\u00A0")
        .replace(/<br>/g, "<br/>")
        .replace(/<img([^>]+)>/gi, "<img$1/>")
        // Correct span tags that might be incorrectly closed
        .replace(/<span([^>]*)>(.*?)<\/?span>/gi, "<span$1>$2</span>")
        // Handle div tags for proper nesting
        .replace(/<div([^>]*)>(.*?)<\/?div>/gi, "<div$1>$2</div>");
      const text =
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
        "<!DOCTYPE html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">' +
        "  <head>" +
        `    <title>${page.name || ""}</title>` +
        `${cssForTextSelection}` +
        "  </head>" +
        "  <body>" +
        `    <section>
          <h1>${page.name || ""}</h1>` +
        // `      <p>${page.content}</p>` +
        `      <p>${sanitizedContent}</p>` +
        "    </section>" +
        "  </body>" +
        "</html>";
      zip.file(`OEBPS/page${index}.xhtml`, text);
    });

    zip.generateAsync({ type: "blob" }).then(function (blob) {
      saveAs(blob, `${title}.epub`);
    });
  };

  useEffect(() => {
    if (lastPageRef.current) {
      lastPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pages.length]);

  const addPage = () => {
    setPages([...pages, { name: "", content: "" }]);
  };

  const updatePageName = (index, newName) => {
    const updatedPages = pages.map((page, pageIndex) => {
      if (pageIndex === index) {
        return { ...page, name: newName };
      }
      return page;
    });
    setPages(updatedPages);
  };

  const deletePage = () => {
    if (pages.length > 1) {
      setPages(pages.slice(0, -1));
    }
  };

  const updatePageContent = (index, newContent) => {
    const updatedPages = pages.map((page, pageIndex) => {
      if (pageIndex === index) {
        return { ...page, content: newContent };
      }
      return page;
    });
    setPages(updatedPages);
  };

 
  
  const toolbarOptions = {
    toolbar: [
      ["bold", "italic", "underline"], 
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], 
      [{ font: [] }],
    ],
    clipboard: {      
      matchVisual: false,
    },
  };
  return (
    <div className="  flex flex-col justify-center sm:items-center    max-w-5xl  shadow-lg rounded-lg   min-w-3/4 p-5 w-full bg-gray-50  h-full -mt-10  max-h-[37rem]">
     
      <div className="space-y-4 flex flex-col justify-center  w-full  h-full relative ">
      
        <div className="flex justify-between space-x-50 sm:w-full ">
          <input
            type="text"
            className="font-bold text-2xl px-4 py-2 border w-1/2"
            placeholder="Title of the book"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-black text-white rounded float-right disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={generateEbook}
            disabled={pages.every((page) => page.content === "")}
          >
            Generate eBook
          </button>
        </div>

        <div className="overflow-auto h-[27rem] items-center w-full ">
          {pages.map((page, index) => (
            <div
              key={index}
              ref={index === pages.length - 1 ? lastPageRef : null}
              className="flex justify-center py-4"
            >
              <div className="bg-white shadow-lg p-6 max-w-5xl  border-gray-200 flex flex-col overflow-hidden  w-full">
                <input
                  type="text"
                  className="px-4 py-2 border mb-5 "
                  placeholder="Chapter Name"
                  value={page.name}
                  onChange={(e) => updatePageName(index, e.target.value)}
                />
                <ReactQuill
                  value={page.content}
                  onChange={(content) => updatePageContent(index, content)}
                  className="h-[17rem] mb-5 w-full "
                  modules={toolbarOptions}
                />
                <p className="mt-6 -mb-2 text-sm text-gray-500 text-right pr-2">
                  {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-end items-end space-y-4  absolute sm:mr-5 right-0 bottom-0">
          {pages.length > 1 && (
            <>
              <button
                className="-mt-32 px-4 py-2 bg-red-500 text-white rounded"
                onClick={deletePage}
                data-tooltip-id="delete"
                data-tooltip-content="Delete Chapter"
                data-tooltip-place="left"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Tooltip id="delete" />
            </>
          )}
          <button
            className="px-4 py-2 mb-5 bg-blue-500 shadow-lg text-white rounded-lg "
            onClick={addPage}
            data-tooltip-id="addChapter"
            data-tooltip-content="Add Chapter"
            data-tooltip-place="left"
          >
            <FontAwesomeIcon icon={faAdd} />
          </button>
          <Tooltip id="addChapter" />
        </div>
      </div>
     </div>
  );
}

export default BookEditor;

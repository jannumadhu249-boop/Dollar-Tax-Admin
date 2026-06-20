import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   CKEditor 4 wrapper component
   – Uses window.CKEDITOR (loaded from CDN in index.html)
   – Full toolbar: Source, Bold, Italic, Underline, Font, Size,
     Colour, Align, Lists, Indent, Table, Image, Link, Print,
     Zoom, Undo/Redo, Styles, Smiley, SpecialChar, etc.
───────────────────────────────────────────────────────────── */

const EMAIL_TEMPLATE = `
<table cellpadding="0" cellspacing="0" style="width:460px;border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;margin:0 auto;">
  <tbody>
    <tr>
      <td colspan="2" style="background:#fff;border:1px solid #ccc;padding:6px 12px;font-size:12px;color:#333;">
        contact@dollartaxfiler.com &nbsp;
        <span style="color:#2a7a2a;font-weight:600;">&#127470;&#127475; +91 8466077444</span>
        &nbsp;&nbsp;
        <span style="color:#b22222;font-weight:600;">&#127482;&#127480; +1 970 370 7008 / +1 616 420 9090</span>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px;border:1px solid #ccc;width:55%;">
        <table cellpadding="0" cellspacing="0"><tbody><tr>
          <td>
            <div style="width:38px;height:38px;background:#c0392b;border-radius:3px;display:inline-block;vertical-align:middle;margin-right:8px;text-align:center;line-height:38px;">
              <span style="color:#fff;font-size:20px;">&#9670;</span>
            </div>
          </td>
          <td style="vertical-align:middle;">
            <div style="font-weight:800;font-size:15px;color:#0a6e9e;line-height:1.1;">Dollar Tax Filer</div>
            <div style="font-size:9px;color:#666;letter-spacing:0.3px;">Total Tax Solutions For Your Business</div>
          </td>
        </tr></tbody></table>
      </td>
      <td style="padding:8px 12px;border:1px solid #ccc;text-align:right;vertical-align:middle;">
        <span style="display:inline-block;margin-left:4px;padding:3px 8px;border:1px solid #ccc;border-radius:2px;font-size:11px;color:#333;background:#f9f9f9;">Home</span>
        <span style="display:inline-block;margin-left:4px;padding:3px 8px;border:1px solid #ccc;border-radius:2px;font-size:11px;color:#333;background:#f9f9f9;">Login</span>
        <span style="display:inline-block;margin-left:4px;padding:3px 8px;border:1px solid #ccc;border-radius:2px;font-size:11px;color:#333;background:#f9f9f9;">Contact Us</span>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="border:1px solid #ccc;padding:14px 16px;background:#fff;font-size:13px;color:#222;min-height:60px;">
        <p><strong>Greetings from Dollartaxfiler!!</strong></p>
        <p>&nbsp;</p>
      </td>
    </tr>
  </tbody>
</table>
`;

/* CKEditor 4 full toolbar config matching the screenshot */
const CK_TOOLBAR = [
  {
    name: 'document',
    items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'],
  },
  {
    name: 'clipboard',
    items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'],
  },
  {
    name: 'editing',
    items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
  },
  {
    name: 'tools',
    items: ['Maximize', 'ShowBlocks', '-', 'About'],
  },
  '/',
  {
    name: 'basicstyles',
    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
  },
  {
    name: 'paragraph',
    items: [
      'NumberedList', 'BulletedList', '-',
      'Outdent', 'Indent', '-',
      'Blockquote', 'CreateDiv', '-',
      'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',
      'BidiLtr', 'BidiRtl', 'Language',
    ],
  },
  { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
  {
    name: 'insert',
    items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'],
  },
  '/',
  { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
  { name: 'colors', items: ['TextColor', 'BGColor'] },
  { name: 'tools2', items: ['Maximize'] },
];

/* React wrapper for CKEditor 4 */
function CKEditorField({ id, initialData, onChange }) {
  const mountedRef = useRef(false);

  useEffect(() => {
    // CKEditor 4 is loaded globally via CDN
    const CKEDITOR = window.CKEDITOR;
    if (!CKEDITOR) return;

    // Destroy any pre-existing instance
    if (CKEDITOR.instances[id]) {
      CKEDITOR.instances[id].destroy(true);
    }

    const editor = CKEDITOR.replace(id, {
      toolbar: CK_TOOLBAR,
      height: 260,
      removePlugins: '',
      allowedContent: true,
      extraPlugins: 'font,colorbutton,justify,print,find,showblocks,templates,scayt,language',
      font_names:
        'Arial/Arial, Helvetica, sans-serif;' +
        'Comic Sans MS/Comic Sans MS, cursive;' +
        'Courier New/Courier New, Courier, monospace;' +
        'Georgia/Georgia, serif;' +
        'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
        'Tahoma/Tahoma, Geneva, sans-serif;' +
        'Times New Roman/Times New Roman, Times, serif;' +
        'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
        'Verdana/Verdana, Geneva, sans-serif',
      fontSize_sizes:
        '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;' +
        '20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px',
    });

    editor.setData(initialData || '');

    editor.on('change', () => {
      if (onChange) onChange(editor.getData());
    });

    mountedRef.current = true;

    return () => {
      if (CKEDITOR.instances[id]) {
        CKEDITOR.instances[id].destroy(true);
      }
    };
  }, [id]);

  return (
    <textarea
      id={id}
      style={{ display: 'none' }}
      defaultValue={initialData}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Mailgun Component
───────────────────────────────────────────────────────────── */
export default function Mailgun({ selectedYear = 'TY2025' }) {
  const [excelFile, setExcelFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [editorContent, setEditorContent] = useState(EMAIL_TEMPLATE);
  const [ckReady, setCkReady] = useState(false);

  /* Wait until CKEditor CDN script is fully loaded */
  useEffect(() => {
    const check = () => {
      if (window.CKEDITOR) {
        setCkReady(true);
      } else {
        setTimeout(check, 150);
      }
    };
    check();
  }, []);

  const handleSend = () => {
    if (!subject.trim()) {
      alert('Please enter a Subject before sending.');
      return;
    }
    const content = window.CKEDITOR?.instances?.['mg-editor']?.getData() || editorContent;
    alert(
      `✅ Mail queued!\n\nYear: ${selectedYear.replace('TY', '20')}\nSubject: ${subject}\nContent length: ${content.length} chars`
    );
  };

  const yearLabel = selectedYear.replace('TY', '20');

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out', padding: '20px 24px' }}>
      {/* Page title */}
      <h2 className="view-title">
        Send Mail to All Register in {yearLabel} Tax Year
      </h2>

      {/* ── Choose Excel File ── */}
      <div style={{ marginBottom: '14px' }}>
        <label className="mg-label">Choose Excel File</label>
        <div className="mg-file-wrapper">
          <span className="mg-file-text">
            {excelFile ? excelFile.name : 'No file chosen'}
          </span>
          <label className="mg-browse-btn">
            Browse...
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              style={{ display: 'none' }}
              onChange={e => setExcelFile(e.target.files[0] || null)}
            />
          </label>
        </div>
      </div>

      {/* ── Subject ── */}
      <div style={{ marginBottom: '14px' }}>
        <label className="mg-label">Subject</label>
        <input
          type="text"
          className="mg-full-input"
          value={subject}
          placeholder=""
          onChange={e => setSubject(e.target.value)}
        />
      </div>

      {/* ── Message / CKEditor ── */}
      <div style={{ marginBottom: '18px' }}>
        <label className="mg-label">Message</label>

        {!ckReady ? (
          /* Loading state while CDN script loads */
          <div
            style={{
              border: '1px solid #c8c8c8',
              borderRadius: '4px',
              padding: '24px',
              textAlign: 'center',
              color: '#888',
              fontSize: '13px',
              background: '#fafafa',
            }}
          >
            Loading editor…
          </div>
        ) : (
          <div className="mg-ck-wrapper">
            <CKEditorField
              id="mg-editor"
              initialData={EMAIL_TEMPLATE}
              onChange={setEditorContent}
            />
          </div>
        )}
      </div>

      {/* ── Send Mail button ── */}
      <button className="mg-send-btn" onClick={handleSend}>
        Send Mail
      </button>
    </div>
  );
}

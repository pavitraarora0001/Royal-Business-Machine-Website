import zipfile
import xml.etree.ElementTree as ET
import os

docx_path = r"C:\Pavitra-Arora\Royal-Business-Machine\Documents\PPT-RBM.docx"
if os.path.exists(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        texts = [node.text for node in tree.iter() if node.text]
        print("=== PPT-RBM.docx Content ===")
        print(" ".join(texts))

note_path = r"C:\Pavitra-Arora\Royal-Business-Machine\Documents\Concept Note.docx"
if os.path.exists(note_path):
    with zipfile.ZipFile(note_path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        texts = [node.text for node in tree.iter() if node.text]
        print("\n=== Concept Note.docx Content ===")
        print(" ".join(texts))

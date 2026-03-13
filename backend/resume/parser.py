import re
import io


def extract_text_from_pdf(file):
    """Extract text from PDF file"""
    try:
        import pdfplumber
        text = ""
        # Read file content into BytesIO
        file_content = file.file.read()
        file_bytes = io.BytesIO(file_content)
        
        with pdfplumber.open(file_bytes) as pdf:
            for page in pdf.pages:
                content = page.extract_text()
                if content:
                    text += content
        return text
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"


def extract_text_from_docx(file):
    """Extract text from DOCX file"""
    try:
        from docx import Document
        # Read file content into BytesIO
        file_content = file.file.read()
        file_bytes = io.BytesIO(file_content)
        
        doc = Document(file_bytes)
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text
    except Exception as e:
        return f"Error parsing DOCX: {str(e)}"


def extract_email(text):
    """Extract email from text"""
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    match = re.search(email_pattern, text)
    return match.group(0) if match else None


def extract_phone(text):
    """Extract phone number from text"""
    phone_patterns = [
        r'\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}',
        r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
    ]
    for pattern in phone_patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(0)
    return None


def extract_name(text):
    """Extract name from text (simple heuristic)"""
    lines = text.strip().split('\n')
    if lines:
        first_line = lines[0].strip()
        # Check if first line looks like a name (no numbers, not too long)
        if first_line and len(first_line) < 50 and not any(c.isdigit() for c in first_line[:20]):
            return first_line
    return None


def parse_resume(file):
    """Parse resume file and extract information"""
    file_type = file.filename.lower().split('.')[-1]
    
    if file_type == 'pdf':
        text = extract_text_from_pdf(file)
    elif file_type in ['docx', 'doc']:
        text = extract_text_from_docx(file)
    else:
        return {"error": "Unsupported file format. Please upload PDF or DOCX."}
    
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "text": text
    }

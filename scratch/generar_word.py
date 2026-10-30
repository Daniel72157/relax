import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_document():
    doc = Document()

    # Configurar márgenes
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)

    # Colores de marca
    COLOR_MOSS_DARK = RGBColor(0x4A, 0x52, 0x40)
    COLOR_MOSS = RGBColor(0x71, 0x82, 0x62)
    COLOR_GOLD = RGBColor(0xB2, 0x98, 0x6B)
    COLOR_INK = RGBColor(0x26, 0x28, 0x1F)
    COLOR_GRAY = RGBColor(0x66, 0x66, 0x66)

    # Título Principal
    p_pre = doc.add_paragraph()
    r_pre = p_pre.add_run("RELAX VR 360° MONTERÍA S.A.S.")
    r_pre.font.name = "Arial"
    r_pre.font.size = Pt(10)
    r_pre.font.bold = True
    r_pre.font.color.rgb = COLOR_GOLD
    p_pre.paragraph_format.space_after = Pt(2)

    p_title = doc.add_paragraph()
    r_title = p_title.add_run("Lista y Requerimientos de Material Fotográfico")
    r_title.font.name = "Arial"
    r_title.font.size = Pt(22)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_MOSS_DARK
    p_title.paragraph_format.space_after = Pt(4)

    p_sub = doc.add_paragraph()
    r_sub = p_sub.add_run("Guía completa de producción para fotógrafo, community manager y equipo de diseño web")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(11)
    r_sub.font.italic = True
    r_sub.font.color.rgb = COLOR_GRAY
    p_sub.paragraph_format.space_after = Pt(18)

    # Introducción
    p_intro = doc.add_paragraph()
    r_intro = p_intro.add_run(
        "Este documento detalla todas las fotografías y recursos visuales requeridos para completar el sitio web oficial de Relax VR 360° Montería. "
        "El objetivo es transmitir paz, sofisticación, pulcritud, tecnología de vanguardia y descanso multisensorial."
    )
    r_intro.font.name = "Arial"
    r_intro.font.size = Pt(10.5)
    r_intro.font.color.rgb = COLOR_INK
    p_intro.paragraph_format.space_after = Pt(14)

    # Tabla de especificaciones técnicas
    h1 = doc.add_paragraph()
    r_h1 = h1.add_run("1. Especificaciones Técnicas Generales")
    r_h1.font.name = "Arial"
    r_h1.font.size = Pt(13)
    r_h1.font.bold = True
    r_h1.font.color.rgb = COLOR_MOSS_DARK
    h1.paragraph_format.space_after = Pt(6)

    table_spec = doc.add_table(rows=5, cols=2)
    table_spec.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_spec.autofit = False

    specs_data = [
        ("Formatos aceptados", "JPG de alta calidad, PNG o WEBP."),
        ("Resolución recomendada", "Entre 1200px y 1920px de ancho (mínimo 72 DPI para web, ideal 150+ DPI para nitidez)."),
        ("Iluminación y estilo", "Luz cálida y tenue, ambiente relajante tipo spa/refugio zen. Evitar flash directo duro. Colores naturales acordes a la marca (verde musgo, tonos arena, madera, dorados)."),
        ("Personas / Modelos", "Expresiones de relajación profunda, serenidad, calma corporal (ojos cerrados, respiración tranquila, ropa o toallas blancas/beige pulcras)."),
        ("Carpeta de destino", "Directorio public/images/ en el proyecto web.")
    ]

    for i, (label, val) in enumerate(specs_data):
        row = table_spec.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.5)
        set_cell_margins(c0, 80, 80, 120, 120)
        set_cell_margins(c1, 80, 80, 120, 120)
        set_cell_background(c0, "F6F3EC")
        set_cell_background(c1, "FAFAFA")
        
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(label)
        r0.font.name = "Arial"
        r0.font.bold = True
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = COLOR_MOSS_DARK

        p1 = c1.paragraphs[0]
        r1 = p1.add_run(val)
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_INK

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # Estado actual
    h2 = doc.add_paragraph()
    r_h2 = h2.add_run("2. Estado Actual de Recursos")
    r_h2.font.name = "Arial"
    r_h2.font.size = Pt(13)
    r_h2.font.bold = True
    r_h2.font.color.rgb = COLOR_MOSS_DARK
    h2.paragraph_format.space_after = Pt(6)

    table_state = doc.add_table(rows=3, cols=4)
    table_state.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Elemento", "Archivo", "Ubicación en Web", "Estado"]
    widths = [Inches(1.8), Inches(1.5), Inches(2.0), Inches(1.4)]

    # Encabezados
    hdr_row = table_state.rows[0]
    for idx, text in enumerate(headers):
        cell = hdr_row.cells[idx]
        cell.width = widths[idx]
        set_cell_margins(cell, 100, 100, 120, 120)
        set_cell_background(cell, "4A5240")
        p = cell.paragraphs[0]
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    state_rows = [
        ("Logo oficial de la empresa", "logo.png", "Header, Footer, Tarjeta de Regalo, Admin", "✅ Instalado y ajustado"),
        ("Foto principal (Hero)", "relajacion.jpg", "Portada principal (✦ Línea Insignia)", "✅ Instalado y ajustado")
    ]

    for i, data in enumerate(state_rows, start=1):
        row = table_state.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F9F9F8"
        for idx, text in enumerate(data):
            cell = row.cells[idx]
            cell.width = widths[idx]
            set_cell_margins(cell, 80, 80, 120, 120)
            set_cell_background(cell, bg)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(9)
            if idx == 3:
                r.font.bold = True
                r.font.color.rgb = RGBColor(0x2E, 0x7D, 0x32)
            else:
                r.font.color.rgb = COLOR_INK

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Detalle de fotografías pendientes
    h3 = doc.add_paragraph()
    r_h3 = h3.add_run("3. Inventario Completo de Fotografías Pendientes")
    r_h3.font.name = "Arial"
    r_h3.font.size = Pt(13)
    r_h3.font.bold = True
    r_h3.font.color.rgb = COLOR_MOSS_DARK
    h3.paragraph_format.space_after = Pt(6)

    # Categoría A: Espacios reales del local
    p_catA = doc.add_paragraph()
    r_catA = p_catA.add_run("GRUPO A: Fotografías Reales del Local (Prioridad Alta)")
    r_catA.font.name = "Arial"
    r_catA.font.size = Pt(11)
    r_catA.font.bold = True
    r_catA.font.color.rgb = COLOR_GOLD
    p_catA.paragraph_format.space_after = Pt(4)

    items_A = [
        ("Foto 1: Cabina Privada Climatizada",
         "Componente: components/QueEs.tsx\nNombre sugerido: cabina.jpg",
         "Cuadrada 1:1 (~800×800 px)",
         "Foto del sillón de relajación en cabina privada, con luz tenue y ambiente preparado. Muestra el espacio donde el cliente experimenta su sesión.",
         "[  ] PENDIENTE"),

        ("Foto 2: Interior de la Sede / Recepción",
         "Componente: components/Identidad.tsx\nNombre sugerido: interior.jpg",
         "Vertical 4:5 (~800×1000 px)",
         "Vista del área de recepción, sala de espera o pasillo principal del local en Los Laureles. Transmite bienvenida, elegancia, limpieza y confort térmico.",
         "[  ] PENDIENTE"),

        ("Foto 3: Fachada Exterior de la Sede",
         "Componente: components/Horario.tsx\nNombre sugerido: fachada.jpg",
         "Horizontal 16:9 (~1200×675 px)",
         "Fachada exterior en la Calle 42 #10-50 Local 2, Los Laureles, con el letrero visible. Facilita que los clientes identifiquen la sede al llegar.",
         "[  ] OPCIONAL")
    ]

    table_A = doc.add_table(rows=len(items_A) + 1, cols=4)
    table_A.alignment = WD_TABLE_ALIGNMENT.CENTER
    widths_items = [Inches(1.8), Inches(1.5), Inches(2.6), Inches(1.0)]

    for idx, text in enumerate(["Foto & Ubicación", "Proporción", "Descripción & Requerimiento", "Check"]):
        cell = table_A.rows[0].cells[idx]
        cell.width = widths_items[idx]
        set_cell_margins(cell, 90, 90, 100, 100)
        set_cell_background(cell, "718262")
        p = cell.paragraphs[0]
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.bold = True
        r.font.size = Pt(9)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    for i, item in enumerate(items_A, start=1):
        row = table_A.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F9F9F8"
        for idx, text in enumerate(item[:4]):
            cell = row.cells[idx]
            cell.width = widths_items[idx]
            set_cell_margins(cell, 80, 80, 100, 100)
            set_cell_background(cell, bg)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            r.font.color.rgb = COLOR_INK
            if idx == 0:
                r.font.bold = True
            elif idx == 3:
                r.font.bold = True
                r.font.color.rgb = COLOR_MOSS_DARK

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Categoría B: Protocolos
    p_catB = doc.add_paragraph()
    r_catB = p_catB.add_run("GRUPO B: Protocolos y Herramientas Sensoriales (Prioridad Media)")
    r_catB.font.name = "Arial"
    r_catB.font.size = Pt(11)
    r_catB.font.bold = True
    r_catB.font.color.rgb = COLOR_GOLD
    p_catB.paragraph_format.space_after = Pt(4)

    items_B = [
        ("Foto 4: Realidad Virtual 360° (Detalle)",
         "Componente: components/Ambiente.tsx\nNombre: protocolo-vr.jpg",
         "Horizontal 16:9 (~800×450 px)",
         "Primer plano estilizado de los visores de Realidad Virtual (Meta Quest 3), con iluminación tenue y ambientación estética.",
         "[  ] PENDIENTE"),

        ("Foto 5: Pistola & Piedras Volcánicas",
         "Componente: components/Ambiente.tsx\nNombre: protocolo-piedras.jpg",
         "Horizontal 16:9 (~800×450 px)",
         "Detalle de las gemas volcánicas negras sobre toalla o en proceso de termoterapia, junto a la pistola de percusión muscular.",
         "[  ] PENDIENTE"),

        ("Foto 6: Aromaterapia doTERRA CPTG",
         "Componente: components/Ambiente.tsx\nNombre: protocolo-doterra.jpg",
         "Horizontal 16:9 (~800×450 px)",
         "Frascos oficiales de aceites esenciales doTERRA (lavanda, menta, etc.) con difusor ultrasónico emitiendo vapor fino.",
         "[  ] PENDIENTE")
    ]

    table_B = doc.add_table(rows=len(items_B) + 1, cols=4)
    table_B.alignment = WD_TABLE_ALIGNMENT.CENTER

    for idx, text in enumerate(["Foto & Ubicación", "Proporción", "Descripción & Requerimiento", "Check"]):
        cell = table_B.rows[0].cells[idx]
        cell.width = widths_items[idx]
        set_cell_margins(cell, 90, 90, 100, 100)
        set_cell_background(cell, "718262")
        p = cell.paragraphs[0]
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.bold = True
        r.font.size = Pt(9)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    for i, item in enumerate(items_B, start=1):
        row = table_B.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F9F9F8"
        for idx, text in enumerate(item[:4]):
            cell = row.cells[idx]
            cell.width = widths_items[idx]
            set_cell_margins(cell, 80, 80, 100, 100)
            set_cell_background(cell, bg)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            r.font.color.rgb = COLOR_INK
            if idx == 0:
                r.font.bold = True
            elif idx == 3:
                r.font.bold = True
                r.font.color.rgb = COLOR_MOSS_DARK

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Categoría C: Paisajes
    p_catC = doc.add_paragraph()
    r_catC = p_catC.add_run("GRUPO C: Paisajes Inmersivos para el Simulador 360°")
    r_catC.font.name = "Arial"
    r_catC.font.size = Pt(11)
    r_catC.font.bold = True
    r_catC.font.color.rgb = COLOR_GOLD
    p_catC.paragraph_format.space_after = Pt(4)

    items_C = [
        ("Foto 7: Playa Caribeña al Atardecer",
         "Componente: components/Simulador.tsx\nNombre: paisaje-playa.jpg",
         "Horizontal 16:9 (~1200×675 px)",
         "Atardecer dorado en el mar, oleaje suave, palmeras y cielo cálido.",
         "[  ] PENDIENTE"),

        ("Foto 8: Bosque de Bambú & Cascada Zen",
         "Componente: components/Simulador.tsx\nNombre: paisaje-cascada.jpg",
         "Horizontal 16:9 (~1200×675 px)",
         "Cascada natural de agua clara rodeada de bambú y vegetación densa verde.",
         "[  ] PENDIENTE"),

        ("Foto 9: Valle del Sinú & Noche Estrellada",
         "Componente: components/Simulador.tsx\nNombre: paisaje-sinu.jpg",
         "Horizontal 16:9 (~1200×675 px)",
         "Paisaje de río o valle cordobés bajo un cielo nocturno despejado con estrellas.",
         "[  ] PENDIENTE"),

        ("Foto 10: Lago Glacial & Aurora Boreal",
         "Componente: components/Simulador.tsx\nNombre: paisaje-aurora.jpg",
         "Horizontal 16:9 (~1200×675 px)",
         "Lago de aguas tranquilas reflejando una aurora boreal verde y azul nocturna.",
         "[  ] PENDIENTE")
    ]

    table_C = doc.add_table(rows=len(items_C) + 1, cols=4)
    table_C.alignment = WD_TABLE_ALIGNMENT.CENTER

    for idx, text in enumerate(["Foto & Ubicación", "Proporción", "Descripción & Requerimiento", "Check"]):
        cell = table_C.rows[0].cells[idx]
        cell.width = widths_items[idx]
        set_cell_margins(cell, 90, 90, 100, 100)
        set_cell_background(cell, "718262")
        p = cell.paragraphs[0]
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.bold = True
        r.font.size = Pt(9)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    for i, item in enumerate(items_C, start=1):
        row = table_C.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F9F9F8"
        for idx, text in enumerate(item[:4]):
            cell = row.cells[idx]
            cell.width = widths_items[idx]
            set_cell_margins(cell, 80, 80, 100, 100)
            set_cell_background(cell, bg)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            r.font.color.rgb = COLOR_INK
            if idx == 0:
                r.font.bold = True
            elif idx == 3:
                r.font.bold = True
                r.font.color.rgb = COLOR_MOSS_DARK

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Categoría D: Medios
    p_catD = doc.add_paragraph()
    r_catD = p_catD.add_run("GRUPO D: Material de Prensa y Difusión (Opcional)")
    r_catD.font.name = "Arial"
    r_catD.font.size = Pt(11)
    r_catD.font.bold = True
    r_catD.font.color.rgb = COLOR_GOLD
    p_catD.paragraph_format.space_after = Pt(4)

    items_D = [
        ("Foto 11: Nota en Prensa / Chica Noticias",
         "LEEME.md\nNombre: medios-chica-noticias.jpg",
         "Horizontal 16:9 (~1200×675 px)",
         "Captura de pantalla o miniatura oficial del reportaje/entrevista de Chica Noticias sobre Relax VR 360° en Montería.",
         "[  ] OPCIONAL")
    ]

    table_D = doc.add_table(rows=len(items_D) + 1, cols=4)
    table_D.alignment = WD_TABLE_ALIGNMENT.CENTER

    for idx, text in enumerate(["Foto & Ubicación", "Proporción", "Descripción & Requerimiento", "Check"]):
        cell = table_D.rows[0].cells[idx]
        cell.width = widths_items[idx]
        set_cell_margins(cell, 90, 90, 100, 100)
        set_cell_background(cell, "718262")
        p = cell.paragraphs[0]
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.bold = True
        r.font.size = Pt(9)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    for i, item in enumerate(items_D, start=1):
        row = table_D.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F9F9F8"
        for idx, text in enumerate(item[:4]):
            cell = row.cells[idx]
            cell.width = widths_items[idx]
            set_cell_margins(cell, 80, 80, 100, 100)
            set_cell_background(cell, bg)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            r.font.color.rgb = COLOR_INK
            if idx == 0:
                r.font.bold = True
            elif idx == 3:
                r.font.bold = True
                r.font.color.rgb = COLOR_MOSS_DARK

    doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # Instrucciones de Entrega
    h4 = doc.add_paragraph()
    r_h4 = h4.add_run("4. Instrucciones de Entrega e Implementación")
    r_h4.font.name = "Arial"
    r_h4.font.size = Pt(13)
    r_h4.font.bold = True
    r_h4.font.color.rgb = COLOR_MOSS_DARK
    h4.paragraph_format.space_after = Pt(6)

    instructions = [
        "1. Nombrar cada archivo según la columna 'Nombre sugerido' o con nombres claros en minúsculas (ejemplo: cabina.jpg, interior.jpg, etc.).",
        "2. Guardar los archivos directamente en la carpeta: public/images/ del proyecto.",
        "3. Una vez guardados en esa carpeta, el asistente o desarrollador actualizará los componentes para que se muestren inmediatamente en el sitio web con optimización Next.js.",
        "4. Si tienes fotos en Google Drive o enlace de descarga, puedes descargarlas en esa carpeta o compartirlas para su respectiva integración."
    ]

    for inst in instructions:
        p_inst = doc.add_paragraph()
        r_inst = p_inst.add_run(inst)
        r_inst.font.name = "Arial"
        r_inst.font.size = Pt(9.5)
        r_inst.font.color.rgb = COLOR_INK
        p_inst.paragraph_format.space_after = Pt(3)

    output_path = r"c:\Users\danie\OneDrive\Desktop\VR360\Lista_de_Fotos_Requeridas_RelaxVR360.docx"
    doc.save(output_path)
    print("Documento guardado con éxito en:", output_path)

if __name__ == "__main__":
    create_document()

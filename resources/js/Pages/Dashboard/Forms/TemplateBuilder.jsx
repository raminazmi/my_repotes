import React, { useState } from "react";

// أنواع البلوكات الأساسية
const BLOCK_TYPES = [
  { type: "header", label: "رأس الصفحة" },
  { type: "section", label: "قسم" },
  { type: "checklist", label: "مربعات اختيار" },
  { type: "images", label: "صور الشواهد" },
];

export default function TemplateBuilder({ value, onChange }) {
  const [blocks, setBlocks] = useState(value || []);

  // إضافة بلوك جديد
  const addBlock = (type) => {
    const newBlock = { type, fields: [] };
    setBlocks([...blocks, newBlock]);
    onChange && onChange([...blocks, newBlock]);
  };

  // تحديث بلوك
  const updateBlock = (idx, block) => {
    const newBlocks = [...blocks];
    newBlocks[idx] = block;
    setBlocks(newBlocks);
    onChange && onChange(newBlocks);
  };

  // حذف بلوك
  const removeBlock = (idx) => {
    const newBlocks = blocks.filter((_, i) => i !== idx);
    setBlocks(newBlocks);
    onChange && onChange(newBlocks);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        {BLOCK_TYPES.map((b) => (
          <button
            key={b.type}
            type="button"
            className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
            onClick={() => addBlock(b.type)}
          >
            + {b.label}
          </button>
        ))}
      </div>
      {blocks.map((block, idx) => (
        <div key={idx} className="border rounded p-4 mb-2 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">{BLOCK_TYPES.find(b => b.type === block.type)?.label}</span>
            <button onClick={() => removeBlock(idx)} className="text-red-500">حذف</button>
          </div>
          {/* حقول البلوك */}
          <BlockFields
            block={block}
            onChange={(newBlock) => updateBlock(idx, newBlock)}
          />
        </div>
      ))}
    </div>
  );
}

// مكون فرعي لإدارة الحقول داخل كل بلوك
function BlockFields({ block, onChange }) {
  const [fields, setFields] = useState(block.fields || []);

  // إضافة حقل جديد
  const addField = () => {
    const newField = { label: "", type: "text", value: "" };
    setFields([...fields, newField]);
    onChange({ ...block, fields: [...fields, newField] });
  };

  // تحديث حقل
  const updateField = (idx, field) => {
    const newFields = [...fields];
    newFields[idx] = field;
    setFields(newFields);
    onChange({ ...block, fields: newFields });
  };

  // حذف حقل
  const removeField = (idx) => {
    const newFields = fields.filter((_, i) => i !== idx);
    setFields(newFields);
    onChange({ ...block, fields: newFields });
  };

  return (
    <div>
      {fields.map((field, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            className="border rounded px-2 py-1 flex-1"
            placeholder="عنوان الحقل"
            value={field.label}
            onChange={e => updateField(idx, { ...field, label: e.target.value })}
          />
          <select
            className="border rounded px-2 py-1"
            value={field.type}
            onChange={e => updateField(idx, { ...field, type: e.target.value })}
          >
            <option value="text">نص</option>
            <option value="number">رقم</option>
            <option value="date">تاريخ</option>
            <option value="checkbox">مربع اختيار</option>
            <option value="image">صورة</option>
          </select>
          <button onClick={() => removeField(idx)} className="text-red-500">حذف</button>
        </div>
      ))}
      <button type="button" className="text-blue-600" onClick={addField}>+ إضافة حقل</button>
    </div>
  );
} 
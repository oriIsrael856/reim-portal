import React, { useState, useId } from 'react';
import {
  Plus,
  Trash2,
  Eye,
  CheckSquare,
  ImagePlus,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { uploadImageFile } from '../../services/uploadService';

/* ─────────────────────────────────────────────
   ImageField — upload with progress + drag-drop
   ───────────────────────────────────────────── */
export const ImageField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputId = useId();

  const handleUpload = async (file) => {
    if (!file) return;
    setError(null);
    setProgress(0);
    setUploading(true);
    try {
      const url = await uploadImageFile(file, setProgress);
      onChange(url);
    } catch (err) {
      setError(err?.message || 'ההעלאה נכשלה');
      console.error('[ImageField] upload failed', err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) handleUpload(file);
  };

  const src =
    value && (value.startsWith('http') || value.startsWith('/'))
      ? value
      : null;

  return (
    <div className="mb-4 w-full">
      {label && (
        <span className="flex items-center gap-2 text-[10px] font-black text-[#2D2D44]/40 mb-1 uppercase tracking-wider block">
          {label}
        </span>
      )}
      <label
        htmlFor={fileInputId}
        className={`relative w-full aspect-video max-h-[200px] rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center cursor-pointer transition-all block ${
          uploading ? 'pointer-events-none opacity-70' : ''
        } ${
          dragging
            ? 'border-[#5E3BEE] bg-[#F0F2FF]'
            : src
            ? 'border-[#5E3BEE]/30 hover:border-[#5E3BEE] bg-gray-50'
            : 'border-gray-200 hover:border-[#5E3BEE]/50 bg-[#F8F9FC]'
        }`}
        aria-label={label ? `החלפת תמונה: ${label}` : 'לחצי להחלפת תמונה'}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          disabled={uploading}
        />

        {/* Progress bar */}
        {uploading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 gap-3">
            <div className="w-3/4 bg-white/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white text-xs font-bold">{progress}%</span>
          </div>
        )}

        {src ? (
          <img
            src={src}
            alt=""
            className="w-full h-full object-contain p-1 pointer-events-none"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 pointer-events-none">
            <ImagePlus size={40} />
            <span className="text-xs font-bold text-center px-2">
              {dragging ? 'שחררי כאן' : 'לחצי או גררי תמונה לכאן'}
            </span>
          </div>
        )}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <input
        type="text"
        className="mt-2 w-full p-2 bg-[#F8F9FC] border border-gray-200 rounded-lg text-xs"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="או הדבקי קישור לתמונה (כתובת URL)"
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   SmartField — text/textarea with char count
   ───────────────────────────────────────────── */
export const SmartField = ({ label, value, onChange, maxLength }) => {
  const lowerLabel = String(label || '').toLowerCase();
  const isLong =
    String(value).length > 60 ||
    lowerLabel.includes('text') ||
    lowerLabel.includes('desc') ||
    lowerLabel.includes('content') ||
    /טקסט|תיאור|פסקה/.test(String(label || ''));

  const len = (value || '').length;
  const overLimit = maxLength && len > maxLength;

  return (
    <div className="mb-4 w-full">
      <label className="flex items-center justify-between gap-2 text-[10px] font-black text-[#2D2D44]/40 mb-1 uppercase tracking-wider">
        <span>{label}</span>
        {maxLength && (
          <span className={`normal-case font-semibold ${overLimit ? 'text-red-500' : 'text-gray-300'}`}>
            {len}/{maxLength}
          </span>
        )}
      </label>
      {isLong ? (
        <textarea
          className={`w-full p-3 bg-[#F8F9FC] border-2 rounded-xl focus:bg-white outline-none transition-all text-sm leading-relaxed min-h-[80px] ${
            overLimit ? 'border-red-400 focus:border-red-500' : 'border-[#EEF0F5] focus:border-[#5E3BEE]'
          }`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={`w-full p-3 bg-[#F8F9FC] border-2 rounded-lg focus:bg-white outline-none transition-all text-sm font-bold ${
            overLimit ? 'border-red-400 focus:border-red-500' : 'border-[#EEF0F5] focus:border-[#5E3BEE]'
          }`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   SimpleListEditor — sortable string list
   ───────────────────────────────────────────── */

const SortableStringItem = ({ id, index, value, onUpdate, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-3 items-center group">
      <button
        {...attributes}
        {...listeners}
        aria-label="גרור לסידור מחדש"
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-1"
      >
        <GripVertical size={16} />
      </button>
      <div className="bg-gray-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
        {index + 1}
      </div>
      <input
        className="flex-grow p-3 bg-[#F8F9FC] border border-gray-200 rounded-xl focus:border-[#00BCD4] outline-none text-sm font-medium"
        value={value}
        placeholder="הזן תוכן..."
        onChange={(e) => onUpdate(e.target.value)}
      />
      <button
        onClick={onRemove}
        aria-label={`מחק שורה ${index + 1}`}
        title="מחק שורה"
        className="text-gray-300 hover:text-red-500 p-2 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export const SimpleListEditor = ({ title, items = [], onUpdate, icon = CheckSquare }) => {
  const Icon = icon; // PascalCase alias so JSX can use <Icon> — matches varsIgnorePattern
  const safeItems = Array.isArray(items)
    ? items
    : typeof items === 'string'
    ? [items]
    : [];

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const ids = safeItems.map((_, i) => String(i));

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    onUpdate(arrayMove(safeItems, oldIndex, newIndex));
  };

  const updateItem = (idx, val) => {
    const next = [...safeItems];
    next[idx] = val;
    onUpdate(next);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[30px] p-8 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#E0F7FA] rounded-lg text-[#006064]">
            <Icon size={20} />
          </div>
          <h3 className="font-black text-lg text-[#2D2D44]">{title}</h3>
        </div>
        <button
          onClick={() => onUpdate([...safeItems, ''])}
          className="bg-[#00BCD4] text-white px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 hover:brightness-105"
        >
          <Plus size={14} /> הוסף שורה
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {safeItems.map((item, idx) => (
              <SortableStringItem
                key={idx}
                id={String(idx)}
                index={idx}
                value={item}
                onUpdate={(val) => updateItem(idx, val)}
                onRemove={() => onUpdate(safeItems.filter((_, i) => i !== idx))}
              />
            ))}
            {safeItems.length === 0 && (
              <div className="text-gray-400 text-sm text-center py-4">
                הוסיפי שורות לרשימה באמצעות כפתור ההוספה.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Helpers for isImageKey
   ───────────────────────────────────────────── */
const isImageKey = (key) =>
  /^image\d*$|^logo$/i.test(key) || key === 'image' || key === 'src';

/* ─────────────────────────────────────────────
   Sortable card for UniversalCardEditor
   ───────────────────────────────────────────── */
const getNextCardId = (existingItems) => {
  const numericIds = (existingItems || [])
    .map((item) => item && item.id != null && String(item.id))
    .filter(Boolean)
    .map((id) => parseInt(id, 10))
    .filter((n) => !Number.isNaN(n));
  const nextNum = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
  return nextNum.toString().padStart(2, '0');
};

const SortableCard = ({ id, item, index, onUpdate, onRemove, showRaw }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };

  const cardTitle =
    item?.title || item?.name || item?.label || `פריט ${index + 1}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white rounded-2xl border-2 border-gray-100 hover:border-[#5E3BEE]/20 transition-all shadow-sm group"
    >
      {/* Card header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-50">
        <button
          {...attributes}
          {...listeners}
          aria-label="גרור לסידור מחדש"
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-1 shrink-0"
        >
          <GripVertical size={16} />
        </button>
        <span className="flex-1 font-bold text-sm text-[#2D2D44] truncate">{cardTitle}</span>
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'הרחב' : 'כווץ'}
          className="text-gray-400 hover:text-[#5E3BEE] p-1"
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
        <button
          onClick={() => {
            if (window.confirm('למחוק פריט זה?')) onRemove();
          }}
          aria-label={`מחק: ${cardTitle}`}
          title="מחק פריט"
          className="text-red-300 hover:text-red-500 p-1 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Card body */}
      {!collapsed && (
        <div className="p-6 space-y-2">
          {Object.keys(item).map((key) => {
            if (key === 'id') return null;
            if (Array.isArray(item[key])) {
              return (
                <SimpleListEditor
                  key={key}
                  title={key === 'items' ? 'רשימה פנימית' : key}
                  items={item[key]}
                  onUpdate={(newArr) => onUpdate(key, newArr)}
                  icon={CheckSquare}
                />
              );
            }
            if (isImageKey(key) && typeof item[key] === 'string') {
              return (
                <ImageField
                  key={key}
                  label={key}
                  value={item[key]}
                  onChange={(val) => onUpdate(key, val)}
                />
              );
            }
            return (
              <SmartField
                key={key}
                label={key}
                value={item[key]}
                onChange={(val) => onUpdate(key, val)}
              />
            );
          })}
          {showRaw && (
            <pre className="mt-4 p-2 bg-gray-900 text-green-400 text-[10px] rounded dir-ltr text-left overflow-auto">
              {JSON.stringify(item, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   UniversalCardEditor — sortable object list
   ───────────────────────────────────────────── */
export const UniversalCardEditor = ({
  title,
  items = [],
  onUpdate,
  newItemTemplate = {},
  icon = CheckSquare,
}) => {
  const Icon = icon; // PascalCase alias for JSX usage — matches varsIgnorePattern
  const safeItems = Array.isArray(items) ? items : [];
  const [showRaw, setShowRaw] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const ids = safeItems.map((_, i) => String(i));

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    onUpdate(arrayMove(safeItems, oldIndex, newIndex));
  };

  const updateItemField = (idx, key, val) => {
    const next = [...safeItems];
    next[idx] = { ...next[idx], [key]: val };
    onUpdate(next);
  };

  const handleAddCard = () => {
    const nextId = getNextCardId(safeItems);
    onUpdate([...safeItems, { ...newItemTemplate, id: nextId }]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[30px] p-8 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F0F2FF] rounded-lg text-[#5E3BEE]">
            <Icon size={20} />
          </div>
          <h3 className="font-black text-lg text-[#2D2D44]">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRaw((s) => !s)}
            aria-label={showRaw ? 'הסתר JSON גולמי' : 'הצג JSON גולמי'}
            title="JSON גולמי"
            className="text-gray-300 hover:text-[#5E3BEE] p-1"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={handleAddCard}
            className="bg-[#C5E080] text-[#2D2D44] px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 hover:brightness-105"
          >
            <Plus size={14} /> הוסף כרטיס
          </button>
        </div>
      </div>

      {safeItems.length === 0 && (
        <div className="text-center text-gray-300 py-8">
          אין פריטים להצגה. לחץ &quot;הוסף כרטיס&quot; כדי להתחיל.
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 gap-4">
            {safeItems.map((item, idx) => (
              <SortableCard
                key={idx}
                id={String(idx)}
                item={item}
                index={idx}
                onUpdate={(key, val) => updateItemField(idx, key, val)}
                onRemove={() => onUpdate(safeItems.filter((_, i) => i !== idx))}
                showRaw={showRaw}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

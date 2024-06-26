import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface CollapsibleCardProps {
  title: string;
  content?: string;
  editable: boolean;
  onContentChange?: (newContent: string) => void;
  sections?: {
    title: string;
    options: string[];
    selectedOption: string;
    onOptionChange: (newSelectedOption: string) => void;
  }[];
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
    title,
    content,
    editable,
    onContentChange,
    sections
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editableContent, setEditableContent] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setEditableContent(newContent);
    adjustTextAreaHeight();
  };

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (editable) {
      adjustTextAreaHeight();
    }
  }, [editable]);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [editableContent]);

  return (
    <div className="bg-white mb-4 flex justify-between">
      <div className="w-2/12 flex items-start cursor-pointer text-gray-400" onClick={toggleOpen}>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCaretRight}
            className={`mr-2 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
          <p className="text-lg text-black overflow-x-hidden">{title}</p>
        </div>
      </div>
      <div className={`w-10/12 transition-max-height duration-1000 overflow-hidden ${isOpen ? 'max-h-dvh' : 'max-h-0'}`}>
        <div className="mt-2 border-l border-gray-800 pl-4">
          {editable && !sections &&
              <textarea
                  ref={textAreaRef}
                  className="w-full p-2 border border-gray-300 rounded resize-none"
                  value={editableContent}
                  onChange={handleContentChange}
                  style={{ overflow: 'hidden' }}
              />}
          {editable ? (
            <>
              {sections && sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mt-4">
                    <h4 className="font-bold">{section.title}</h4>
                    <div className="flex space-x-2">
                      {section.options.map((option, optionIndex) => (
                          <button
                              key={optionIndex}
                              onClick={() => section.onOptionChange(option)}
                              className={`px-4 py-1 mt-2 border ${section.selectedOption === option ? 'border-black font-bold' : 'border-gray-300 text-gray-300'} rounded transition duration-300`}
                          >
                            {option}
                          </button>
                      ))}
                    </div>
                  </div>
              ))}
            </>
          ) : (
            <>
            <p>{editableContent}</p>
              {sections && sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <ul className="list-disc pl-5 font-light">
                      <li>{section.title}: {section.selectedOption}</li>
                    </ul>
                  </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCard;

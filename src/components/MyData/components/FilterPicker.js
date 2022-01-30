import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const FilterPicker = ({
  setFilterIndex,
  filterPickerValue,
  setFilterPickerValue,
  items,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <DropDownPicker
      open={open}
      value={filterPickerValue.value}
      items={items}
      setOpen={setOpen}
      onSelectItem={(newValue) => {
        const newIndex = items.findIndex(
          (element) => element.value === newValue.value,
        );
        setFilterPickerValue(newValue);
        setFilterIndex(newIndex);
      }}
      containerStyle={{
        width: '45%',
        alignSelf: 'flex-end',
        paddingRight: 14,
      }}
      style={{ height: 35 }}
    />
  );
};

export default FilterPicker;

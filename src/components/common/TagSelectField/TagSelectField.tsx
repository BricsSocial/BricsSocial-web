import React from 'react';

import { Chip, Grid, TextField, TextFieldProps } from '@mui/material';
import { Box } from '@mui/system';
import { Control, useController } from 'react-hook-form';

import { Nullable } from 'src/types';

type TagSelectFieldProps = TextFieldProps & {
  name: string;
  control: Control<any>;
};

export const TagSelectField: React.FC<TagSelectFieldProps> = ({
  name,
  control,
  onChange,
  defaultValue,
  ...textFieldProps
}) => {
  const { field } = useController({ name, control });
  const [tags, setTags] = React.useState<string[]>(
    (defaultValue as Nullable<string>)?.split(',') || [],
  );

  const handleChange: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      if (!tags.includes(target.value)) {
        setTags([...tags, target.value]);
        target.value = '';
      }
    }
  };

  React.useEffect(() => {
    field.onChange(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, tags]);

  return (
    <Box>
      <TextField {...textFieldProps} onKeyDown={handleChange} />
      <Grid container direction="row" wrap="wrap" gap={1} mt={1}>
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => setTags(tags => tags.filter(existingTag => existingTag !== tag))}
          />
        ))}
      </Grid>
    </Box>
  );
};

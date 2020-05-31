truncate table invitations;

INSERT INTO `invitations` (
        `id`,
        `code`,
        `user_id`,
        `use_user_id`,
        `use_username`,
        `created_at`,
        `updated_at`
    )
VALUES (
        '',
        '64d44cf6',
        0,
        NULL,
        NULL,
        '',
        ''
    );
   /*  
UPDATE `invitations`
SET `user_id` = '0',
    `use_user_id` = NULL,
    `use_username` = '',
    `created_at` = '',
    `updated_at` = ''
WHERE (`id` = '1') */